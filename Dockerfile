# 使用官方的Node.js镜像作为基础镜像
FROM node:current-alpine

# 设置工作目录
WORKDIR /icat_lite

RUN npm config set registry https://registry.npmmirror.com

# 将你的应用源代码复制到容器
COPY . .

# 安装依赖
RUN npm ci

# 暴露端口
EXPOSE 8095

# 运行你的Node.js程序，并允许传递命令行参数
# 注意，我们使用ENTRYPOINT和CMD分开定义，以允许参数传递
ENTRYPOINT [ "node" ]
CMD [ "serve.js"]