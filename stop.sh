error_exit() {
  log "错误: $1"
  exit 1
}
source ~/.bashrc || error_exit "应用.bashrc文件失败"
cd install
npx pm2 stop all