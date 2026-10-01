# 蓝色大肥鱼 · dsh-pet 下载站

dsh-pet 桌面宠物（蓝色大肥鱼）的静态下载入口与文档站。纯 HTML / CSS / JS，无构建、无依赖。

- 下载文件由 **GitHub Releases** 提供（[a1554369871/dsh-pet](https://github.com/a1554369871/dsh-pet)）。
- 站点纯静态，可部署到任意静态托管或自有服务器。

## 目录结构

```
website/
├─ index.html        首页
├─ download.html     下载（全平台）+ 安装教程
├─ guide.html        使用教程
├─ pet.html          宠物养护
├─ ai.html           AI 对话教程
├─ faq.html          常见问题
├─ changelog.html    更新日志
├─ css/style.css     全站样式
├─ js/config.js      版本号 + 下载直链（**改版本只动这里**）
├─ js/main.js        OS 识别、下载填充、导航交互
└─ assets/img/       favicon、Hero 图、占位截图
```

## 本地预览

任选一种：

```powershell
# 方式一：Python 内置服务器（进入本目录后执行）
E:\miniconda\python.exe -m http.server 8000
# 浏览器打开 http://localhost:8000/
```

```nginx
# 方式二：本机 Windows nginx，在 nginx.conf 的 http {} 内加一段 server
server {
    listen       8080;
    server_name  localhost;
    root         E:/pet/website;
    index        index.html;
    location / { try_files $uri $uri/ =404; }
}
# 保存后：nginx.exe -s reload，访问 http://localhost:8080/
```

## 更新版本 / 下载直链

只需编辑 `js/config.js`：

1. 改 `version`（例如 `"1.0.6.8"`）。
2. 改 `releaseBase` 为对应 tag，例如 `.../releases/download/v1.0.6.8`。
3. 若产物文件名有变化，同步改 `files` 里的 `name`。

页面上所有 `[data-version]` 与 `[data-dl]` 元素会自动更新。

## 替换占位截图

首页 6 张占位图位于 `assets/img/shot-1.jpg` ~ `shot-6.jpg`。拿到真实截图后：

1. 用真实截图覆盖同名文件（建议宽度 ≤ 1200px、jpg、体积 < 300KB）。
2. 按需修改 `index.html` 中对应 `<figcaption>` 的文字说明。

## 部署到腾讯云 Windows Server（公网 IP、暂无域名）

> 仅用 IP 访问**不需要 ICP 备案**。等以后买了域名再走「解析 → 备案 → HTTPS」流程。

### 1. 服务器安装 nginx（Windows 版）

1. 打开 <https://nginx.org/en/download.html> 下载 `nginx/Windows` 稳定版 zip。
2. 解压到 `C:\nginx`（路径不要有中文 / 空格）。

### 2. 上传站点文件

把本目录（`website`）里的全部文件上传到服务器，例如 `C:\www\blue-fish`。可用：

- Xshell 配套的 **Xftp** 直接拖拽；或
- 在本地（WSL）用 scp：`scp -r /mnt/e/pet/website/* user@<公网IP>:/cygdrive/c/www/blue-fish`（Windows OpenSSH 场景按实际路径调整）。

### 3. 配置 nginx

编辑 `C:\nginx\conf\nginx.conf`，在 `http { ... }` 内加入：

```nginx
server {
    listen       80;
    server_name  _;

    root   C:/www/blue-fish;
    index  index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # 静态资源缓存（可选）
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|webp|svg)$ {
        expires 7d;
        add_header Cache-Control "public";
    }
}
```

### 4. 启动 / 重载 nginx

```powershell
cd C:\nginx
.\nginx.exe                # 首次启动
.\nginx.exe -s reload      # 改完配置后重载
.\nginx.exe -s quit        # 停止
```

> 建议用 [NSSM](https://nssm.cc/) 把 nginx 注册成 Windows 服务，实现开机自启与崩溃重启。

### 5. 放行端口

```powershell
# 服务器本机防火墙
netsh advfirewall firewall add rule name="HTTP 80" dir=in action=allow protocol=TCP localport=80
```

再到 **腾讯云控制台 → 轻量应用服务器 / CVM → 防火墙（安全组）** 添加规则：放行 **TCP 80**（以后要 HTTPS 再加 443）。

### 6. 验证

浏览器访问 `http://<公网IP>/`，应能看到首页。

## 后续：绑定域名 + HTTPS（需要备案）

1. 购买域名并完成实名认证。
2. 在腾讯云 **DNS 解析**里给域名加一条 A 记录指向服务器公网 IP。
3. 到腾讯云 **ICP 备案**系统提交备案（大陆服务器 + 域名访问为强制，约 1–3 周）。
4. 备案通过后，在腾讯云申请**免费 DV 证书**，下载 nginx 格式，配置 443：

```nginx
server {
    listen 443 ssl;
    server_name 你的域名;

    ssl_certificate     C:/nginx/conf/certs/your.crt;
    ssl_certificate_key C:/nginx/conf/certs/your.key;

    root  C:/www/blue-fish;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}

server {
    listen 80;
    server_name 你的域名;
    return 301 https://$host$request_uri;
}
```

## 备注

- 站点内容摘自 dsh-pet 仓库 README，版本更新后如有新增功能，直接在对应页面补充即可。
- 素材来源与致谢见 dsh-pet 仓库 README 的「项目来源与素材声明」。
