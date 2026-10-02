/* =========================================================================
 * 蓝色大肥鱼 · dsh-pet 站点配置
 * 版本更新时只需要改这一个文件：改 version 和 releaseBase，直链会自动同步。
 * ========================================================================= */
window.DSH_SITE = {
  /* 当前版本（与桌宠 pet/__init__.py 保持一致） */
  version: "1.0.7.0",

  /* 仓库与发布页 */
  repo: "https://github.com/a1554369871/dsh-pet",
  releasesPage: "https://github.com/a1554369871/dsh-pet/releases",
  releaseBase: "https://github.com/a1554369871/dsh-pet/releases/download/v1.0.7.0",

  /* 各产物文件名 + 大致体积，key 与页面 data-dl 对应 */
  files: {
    winChatSetup:   { name: "dsh-pet-standalone-webm-chat-setup.exe",  size: "约 128 MB" },
    winChatZip:     { name: "dsh-pet-standalone-webm-chat-portable.zip", size: "约 156 MB" },
    winSetup:       { name: "dsh-pet-standalone-webm-setup.exe",       size: "约 128 MB" },
    winZip:         { name: "dsh-pet-standalone-webm-portable.zip",    size: "约 156 MB" },
    macChat:        { name: "dsh-pet-standalone-webm-chat-macos-arm64.zip", size: "约 150 MB" },
    macPlain:       { name: "dsh-pet-standalone-webm-macos-arm64.zip",      size: "约 150 MB" },
    linuxChat:      { name: "dsh-pet-standalone-webm-chat-linux-x86_64.zip", size: "约 160 MB" },
    linuxPlain:     { name: "dsh-pet-standalone-webm-linux-x86_64.zip",      size: "约 160 MB" }
  }
};
