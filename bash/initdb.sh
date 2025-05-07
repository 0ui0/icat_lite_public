#!/bin/bash

# 定义函数
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

error_exit() {
  log "错误: $1"
  exit 1
}

check_command() {
  if [ $? -ne 0 ]; then
    error_exit "$1"
  fi
}

# 检查是否以root用户身份运行
if [ "$EUID" -ne 0 ]; then
  error_exit "请以root用户身份运行此脚本"
fi

# 默认变量
WORKDIR=$(pwd)
PG_DIR="/tmp/postgresql-17rc1"
PREFIX="/Users/miao/pgsql"
POSTGRES_USER="postgres"
POSTGRES_GROUP="postgres"
POSTGRES_PASSWORD="postgres"
DB_NAME="oxo"
DB_USER="oxo"
DB_PASSWORD="oxo_passwd"
UNDO=false


# 解析命令行参数
while [[ $# -gt 0 ]]; do
  case $1 in
    --dbUser)
      DB_USER="$2"
      shift 2
      ;;
    --dbName)
      DB_NAME="$2"
      shift 2
      ;;
    --dbPassword)
      DB_PASSWORD="$2"
      shift 2
      ;;
    --undo)
      UNDO=true
      shift
      ;;
    *)
      log "未知参数: $1"
      shift
      ;;
  esac
done

echo "undo:$UNDO"

# 检测操作系统
UNAME=$(uname) || error_exit "无法获取操作系统名称"
if [[ "$UNAME" == "Darwin" ]]; then
  OS="Mac"
elif [[ "$UNAME" == "Linux" ]]; then
  OS="Linux"
else
  error_exit "未知的操作系统: $UNAME"
fi
log "操作系统: $OS"

# 以postgres用户身份运行命令
run_as_postgres() {
  su - $POSTGRES_USER -c "$1"
}



# 主要逻辑
main() {
  if [ "$UNDO" = true ]; then
    log 启动卸载程序
    undo_changes
    exit 0
  fi

  # 创建postgres用户和组
  create_postgres_user

  # 安装依赖
  install_dependencies

  # 编译和安装PostgreSQL
  install_postgreSQL() {
    log "开始编译和安装PostgreSQL..."

    mkdir -p $PG_DIR || error_exit "创建解压目录失败"
    tar -zxf ./postgre/postgresql-17rc1.tar.gz -C /tmp || error_exit "解压PostgreSQL源码失败"
    cd $PG_DIR || error_exit "进入PostgreSQL源码目录失败"

    mkdir -p $PREFIX || error_exit "创建postgre运行目录失败"

    if [ $OS == "Mac" ]; then
      log "mac configure"
      ./configure --prefix=$PREFIX --without-icu || error_exit "配置PostgreSQL时出错"
    else
      ./configure --prefix=$PREFIX 
    fi
    
    check_command "配置PostgreSQL时出错"

    make || error_exit "编译PostgreSQL时出错"
    check_command "编译PostgreSQL时出错"

    make install || error_exit "安装PostgreSQL时出错"
    check_command "安装PostgreSQL时出错"

    log "PostgreSQL编译和安装完成。"

    log "设置pgsql目录权限..."
    # 设置数据目录权限
    mkdir -p $PREFIX/data || error_exit "创建data目录失败"
    #chmod -R 777 $PREFIX
    chown -R $POSTGRES_USER:$POSTGRES_GROUP $PREFIX || error_exit "设置数据目录权限失败"
    log "data目录所有者设置为$POSTGRES_USER"
    
  }

  if [ ! -d "$PREFIX/data" ]; then
    install_postgreSQL
  else
    log "PostgreSQL 已安装"
  fi



  # 初始化数据库集群
  log "初始化数据库集群..."
  run_as_postgres "$PREFIX/bin/initdb -D $PREFIX/data" || error_exit "配置PostgreSQL时出错"
  log "数据库集群初始化完成。"

  # 配置PostgreSQL
  log "配置PostgreSQL..."
  echo "port = 5432" >> $PREFIX/data/postgresql.conf || error_exit "配置PostgreSQL时出错"
  log "配置完成。"

  # 启动PostgreSQL服务
  log "启动PostgreSQL服务..."
  run_as_postgres "$PREFIX/bin/pg_ctl -D $PREFIX/data -l $PREFIX/logfile start" || error_exit "启动服务失败"
  log "PostgreSQL服务启动完成。"

  # 创建数据库和用户
  log "创建数据库$DB_NAME和用户$DB_USER..."
  run_as_postgres "$PREFIX/bin/psql -c \"CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';\"" || error_exit "创建数据库用户失败"
  run_as_postgres "$PREFIX/bin/psql -c \"CREATE DATABASE $DB_NAME OWNER $DB_USER;\"" || error_exit "创建数据库失败"
  log "数据库$DB_NAME和用户$DB_USER创建完成。"

  log "创建数据库miaoctr..."
  run_as_postgres "$PREFIX/bin/psql -c \"CREATE USER miaoctr WITH PASSWORD '$DB_PASSWORD';\"" || error_exit "创建数据库用户失败"
  run_as_postgres "$PREFIX/bin/psql -c \"ALTER USER miaoctr WITH SUPERUSER;\"" || error_exit "设置miaoctr超级用户权限失败"
  run_as_postgres "$PREFIX/bin/psql -c \"CREATE DATABASE miaoctr OWNER miaoctr;\"" || error_exit "创建数据库失败"
  log "数据库miaoctr和用户miaoctr创建完成。"

  # 设置用户的数据库所有权
  log "设置用户$DB_USER对数据库$DB_NAME的所有权..."
  run_as_postgres "$PREFIX/bin/psql -c \"ALTER DATABASE $DB_NAME OWNER TO $DB_USER;\"" || error_exit "所有权配置失败"
  log "用户$DB_USER对数据库$DB_NAME的所有权设置完成。"

  # 停止PostgreSQL服务
  log "停止PostgreSQL服务..."
  stop_postgres

  log "所有步骤完成。"
}

# 创建postgres用户和组
create_postgres_user() {
  log "准备创建系统用户"
  case $OS in
    Linux)
      if ! id -u $POSTGRES_USER &>/dev/null; then
        log "创建postgres用户和组..."
        groupadd $POSTGRES_GROUP || error_exit "创建组失败"
        useradd -r -s /bin/bash -g $POSTGRES_GROUP $POSTGRES_USER || error_exit "创建用户失败"
        echo "$POSTGRES_USER:$POSTGRES_PASSWORD" | chpasswd || error_exit "设置用户密码失败"
      fi
      ;;
    Mac)
      if ! id -u $POSTGRES_USER &>/dev/null; then
        log "创建postgres用户和组..."

        getMaxUid() {
          dscl . -list /Users UniqueID | awk '{print $2}' | sort -n | tail -n 1
        }
        getMaxGid() {
          dscl . -list /Groups PrimaryGroupID | awk '{print $2}' | sort -n | tail -n 1
        }
        maxUid=$(getMaxUid)
        maxGid=$(getMaxGid)
        dscl . -create /Users/$POSTGRES_USER || error_exit "创建用户失败"
        dscl . -create /Users/$POSTGRES_USER UserShell /bin/zsh || error_exit "设置用户shell失败"
        dscl . -create /Users/$POSTGRES_USER RealName "postgres miao" || error_exit "设置用户RealName失败"
        dscl . -create /Users/$POSTGRES_USER UniqueID "$((maxUid + 1))" || error_exit "设置用户UniqueID失败"
        dscl . -create /Users/$POSTGRES_USER PrimaryGroupID "$((maxGid + 1))" || error_exit "设置用户PrimaryGroupID失败"
        
        #dscl . -create /Users/$POSTGRES_USER NFSHomeDirectory /Users/$POSTGRES_USER || error_exit "设置用户NFSHomeDirectory失败"
        dscl . -passwd /Users/$POSTGRES_USER "$POSTGRES_PASSWORD" || error_exit "设置用户密码失败"

        # 创建专门的组
        if ! dscl . -list /Groups | grep -q "^$POSTGRES_GROUP\$"; then
          dscl . -create /Groups/$POSTGRES_GROUP || error_exit "创建组失败"
          dscl . -create /Groups/$POSTGRES_GROUP PrimaryGroupID 1001 || error_exit "设置组PrimaryGroupID失败"
        fi

        # 将用户添加到专门的组
        dscl . -append /Groups/$POSTGRES_GROUP GroupMembership $POSTGRES_USER || error_exit "将用户添加到组失败"
        dscl . -append /Groups/staff GroupMembership $POSTGRES_USER || error_exit "将用户添加到组staff失败"
        dscl . -append /Groups/admin GroupMembership $POSTGRES_USER || error_exit "将用户添加到组admin失败"

        mkdir /Users/$POSTGRES_USER 
        chown $POSTGRES_USER:$POSTGRES_GROUP /Users/$POSTGRES_USER | error_exit "设置家目录所有者和组失败"
        dscl . -create /Users/$POSTGRES_USER NFSHomeDirectory /Users/$POSTGRES_USER || error_exit "设置用户NFSHomeDirectory失败"


        
      fi
      ;;
  esac
}

# 安装依赖
install_dependencies() {
  case $OS in
    Linux)
      if command -v apt-get &> /dev/null; then
        log "使用apt自动安装依赖"
        apt-get update || error_exit "更新apt软件包列表失败"
        apt-get install -y build-essential libreadline-dev zlib1g-dev libicu-dev || error_exit "安装依赖失败"
      elif command -v yum &> /dev/null; then
        log "使用yum自动安装依赖"
        yum groupinstall -y "Development Tools" || error_exit "安装开发工具组失败"
        yum install -y readline-devel zlib-devel libicu-devel || error_exit "安装依赖失败"
      else
        error_exit "无法找到包管理器，请手动安装编译工具和依赖库。"
      fi
      ;;
    Mac)
      if ! command -v brew &> /dev/null; then
        #log "Homebrew未安装，现在安装..."
        #/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/main/install.sh)" || error_exit "安装Homebrew失败"
        echo 未发现brew，请手动安装
      fi
      log "请手动使用brew安装依赖，命令行执行执行brew install readline icu4c"
      # 设置环境变量
      #chmod -R 771 /opt/homebrew
      #run_as_postgres "/opt/homebrew/bin/brew update" || error_exit "更新brew软件包列表失败"
      #run_as_postgres "/opt/homebrew/bin/brew install readline icu4c icu-uc icu-i18n" || error_exit "安装依赖失败"
      ;;
  esac
}

# 函数：停止PostgreSQL服务
stop_postgres() {
  log "停止PostgreSQL服务..."
  if pgrep -x "postgres" > /dev/null; then
    run_as_postgres "$PREFIX/bin/pg_ctl -D $PREFIX/data stop" || error_exit "停止PostgreSQL服务失败"
    log "PostgreSQL服务已停止。"
  else
    log "PostgreSQL服务未运行。"
  fi
}




# 回滚函数
undo_changes() {
  log "开始回滚..."
  # 删除数据库和用户
  log "删除数据库$DB_NAME和用户$DB_USER..."
  if pgrep -x "postgres" > /dev/null; then
    run_as_postgres "$PREFIX/bin/psql -c \"DROP DATABASE IF EXISTS $DB_NAME;\""
    run_as_postgres "$PREFIX/bin/psql -c \"DROP USER IF EXISTS $DB_USER;\""
  fi

  # 停止PostgreSQL服务
  log "停止PostgreSQL服务..."
  if pgrep -x "postgres" > /dev/null; then
    run_as_postgres "$PREFIX/bin/pg_ctl -D $PREFIX/data stop"
    log "PostgreSQL服务已停止。"
  else
    log "PostgreSQL服务未运行。"
  fi


  # 卸载PostgreSQL
  log "卸载PostgreSQL..."
  make -C $PG_DIR uninstall || error_exit "卸载PostgreSQL失败"
  rm -rf $PREFIX || error_exit "删除安装目录失败"

  # 删除postgres用户和组
  log "删除postgres用户和组..."
  case $OS in
    Linux)
      userdel -r $POSTGRES_USER || log "删除用户失败"
      groupdel $POSTGRES_GROUP || log "删除组失败"
      ;;
    Mac)
      dscl . -delete /Users/$POSTGRES_USER || log "删除用户失败"
      dscl . -delete /Groups/$POSTGRES_GROUP || log "删除组失败"
      ;;
  esac

  log "回滚完成。"
}

# 运行主逻辑
main