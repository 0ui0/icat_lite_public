#!/bin/bash

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

error_exit() {
  log "错误: $1"
  exit 1
}

# 检查是否以root用户身份运行
if [ "$EUID" -ne 0 ]; then
  error_exit "请以root用户身份运行此脚本"
fi

installPath="/Users/miao/nodejs"

# 检查是否在正确的目录中
if [[ ! -d "nodejs" ]]; then
  log "请确保你在项目根目录下的bash目录里（即在包含nodejs目录的父目录中）运行此脚本."
  exit 1
fi

# 询问用户操作系统类型
echo "请选择你的Linux操作系统架构:"
echo "1) x64"
echo "2) arm64"
read -p "输入选项 (1/2): " arch_option

# 根据选择解压文件
case $arch_option in
  1)
    tar_file="node-v20.17.0-linux-x64"
    ;;
  2)
    tar_file="node-v20.17.0-linux-arm64"
    ;;
  *)
    echo "无效的选项，请输入1或2."
    exit 1
    ;;
esac

# 检查压缩文件是否存在
if [[ ! -f "nodejs/$tar_file.tar.xz" ]]; then
  log "未找到所需的压缩文件: nodejs/$tar_file.tar.xz"
  exit 1
fi

installPath="/Users/miao/nodejs/$tar_file"

log "创建安装目录..."
mkdir -p $installPath || error_exit "创建安装目录失败"

# 解压文件
cd nodejs
log "正在解压 $tar_file..."
tar -xf "$tar_file.tar.xz" -C "$installPath" || error_exit "解压失败"


# 设置临时环境变量
export PATH="$PATH:$installPath/$tar_file/bin"

# 检查.bashrc文件是否存在，如果不存在则创建
if [ ! -f ~/.bashrc ]; then
  touch ~/.bashrc || error_exit "创建.bashrc文件失败"
fi

line_to_add="export PATH=\"$PATH\""

if ! grep -qF "$line_to_add" ~/.bashrc; then
  # 如果不存在，则追加该行
  log "写入path到~/.bashrc"
  echo "$line_to_add" >> ~/.bashrc
fi

log "应用.bashrc文件以启动环境变量"
source ~/.bashrc || error_exit "应用.bashrc文件失败"

log "为了在外部能访问node和npm，你需要在脚本运行后执行source ~/.bashrc或者重新启动一下终端"


# 返回上一级目录
cd ..
cd ..

# 安装项目依赖
log "配置国内源..."
npm config set registry https://registry.npmmirror.com || error_exit "配置国内源失败"
log "正在安装项目依赖..."
npm ci #|| error_exit "依赖安装失败，请检查错误信息并重试"

# 检查依赖安装是否成功
if [ $? -eq 0 ]; then
  log "依赖安装成功!"
  log "启动喵空间社区程序安装程序，你需要自行安装postgre数据，并且创建好数据库和对应的登录用户"
  cd install
  npx pm2 start install.js
  log "环境准备完成，请访问http://你的网址:8195启动安装程序"
else
  log "依赖安装失败，请检查错误信息并重试."
fi