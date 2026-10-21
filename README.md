<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=220&section=header&text=Base-Dxz&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=WhatsApp%20Channel%20Song%20Sender%20Bot&descAlignY=60&descSize=20" width="100%" />

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=800&color=25D366&center=true&vCenter=true&width=600&lines=%F0%9F%8E%B6+Send+songs+to+WhatsApp+Channels;%E2%9A%A1+Fast+%26+Lightweight+Case-Type+Base;%F0%9F%93%B1+Login+with+QR+or+Pair+Code;%F0%9F%9B%A0+Easy+to+Configure+%26+Extend" alt="Typing SVG" />
</a>

<br/>

<img src="https://img.shields.io/badge/version-1.0.1-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-%E2%89%A518-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Login-QR%20%7C%20Pair%20Code-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />

<br/><br/>

**Built with ❤️ by [@DanuZz](https://github.com/dnuzi)**

</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📑 Table of Contents

- [✨ Features](#-features)
- [📦 Requirements](#-requirements)
- [📂 Project Structure](#-project-structure)
- [▶️ Installation](#️-installation)
- [📱 Login (QR / Pair Code)](#-login-qr--pair-code)
- [⚙️ Configuration](#️-configuration)
- [🚀 Commands & Usage](#-commands--usage)
- [🔎 How to Get a Channel JID](#-how-to-get-a-channel-jid)
- [🎨 Customize the Caption](#-customize-the-caption)
- [🧩 How the Song Scraper Works](#-how-the-song-scraper-works)
- [🛠 Troubleshooting](#-troubleshooting)
- [🛡 Disclaimer](#-disclaimer)

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🎵 | **Channel Song Sender** | Search a song by name or YouTube link and post it to a channel |
| 📱 | **QR & Pair Code Login** | Switch between both with one line in `config.js` |
| 🔁 | **Auto Reconnect** | Reconnects by itself if the connection drops |
| ⚡ | **Fast & Lightweight** | Case-type base, only 3 commands, tiny dependency list |
| 🧩 | **Built-in Scraper** | No third-party API server needed – `lib/ytdl.js` does everything |
| ♻️ | **Hot Reload** | Edit `wa.js` / `config.js` and changes apply without restart |
| 🎨 | **Custom Captions** | Make the song post look however you want |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📦 Requirements

- **Node.js 18+** (uses the built-in `fetch`)
- **ffmpeg** installed and available in your `PATH` (converts audio to voice-note Opus)
- A WhatsApp account to link
- npm or yarn

<details>
<summary>📥 How to install ffmpeg</summary>

```bash
# Ubuntu / Debian / Termux-proot
sudo apt update && sudo apt install -y ffmpeg

# Termux
pkg install ffmpeg

# macOS
brew install ffmpeg

# Windows (winget)
winget install ffmpeg
```

Check it with `ffmpeg -version`.

</details>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📂 Project Structure

```text
dxz-bot/
├── index.js        # connection, QR / pair login, message serializer
├── wa.js           # command handler (switch-case) ← add commands here
├── config.js       # all settings
├── lib/
│   └── ytdl.js     # YouTube search + download scraper
├── package.json
├── LICENSE
└── README.md
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## ▶️ Installation

```bash
git clone https://github.com/dnuzi/wa-song-bot
cd wa-song-bot
npm install
npm start
```

On first start the bot asks WhatsApp to link (see below). After that, the login is saved in the `session/` folder and the bot reconnects automatically.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📱 Login (QR / Pair Code)

Choose the login method in **`config.js`**:

```js
global.login_mode = "qr"    // "qr" or "pair"
```

### 🔲 Option 1 — QR Code (`"qr"`)

1. Run `npm start`
2. A QR code is printed in the terminal
3. WhatsApp → **Settings → Linked Devices → Link a device**
4. Scan the QR code

### 🔢 Option 2 — Pair Code (`"pair"`)

1. Set `global.login_mode = "pair"` and put your number in `global.bot` (country code, no `+`).
   If you leave it as the placeholder, the bot asks for it in the terminal.
2. Run `npm start` — an **8-digit code** is shown, like `ABCD-1234`
3. WhatsApp → **Settings → Linked Devices → Link a device → Link with phone number instead**
4. Enter the code

> 🔄 To log in with a different account, stop the bot, delete the `session/` folder and start again.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## ⚙️ Configuration

Open **`config.js`** and edit your details:

```js
global.login_mode = "qr"            // "qr" or "pair"
global.prefix = "."                 // bot prefix
global.owner = ["9476xxxxxxx"]      // owner number(s), country code, no "+"
global.bot = "9476xxxxxxx"          // bot number (used for pair mode)
global.namabot = "Base-Dxz"         // bot name
global.namaown = "DanuZz"           // bot owner
global.version = "1.0.1"            // bot version
global.footer = "© Base-Dxz v1.0.1 | Made by DanuZz ヅ"
```

| Setting | Meaning |
|---|---|
| `login_mode` | `qr` for QR scan, `pair` for pairing code |
| `prefix` | Symbol before every command |
| `owner` | Numbers allowed to use `csong` (the linked account itself is always allowed) |
| `bot` | Your bot's number — used by pair mode |
| `namabot` / `namaown` | Names shown in menu and caption |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🚀 Commands & Usage

| Command | Who | Description |
|---|---|---|
| `.csong <channelJid> <song name / link>` | 👑 Owner | Search a song and post it to a channel |
| `.ping` | 👥 Everyone | Show response speed and uptime |
| `.menu` | 👥 Everyone | Show the command list |

### 🎵 `.csong` examples

```text
.csong 120363123456789012@newsletter Shape of You
.csong 120363123456789012@newsletter Alan Walker Faded
.csong 120363123456789012@newsletter https://youtu.be/xxxxxxxxxxx
```

**What happens:**

```text
 .csong …
    │
    ├─ 🔍 find the video on YouTube
    ├─ ⬇️  get an MP3 link (scraper)
    ├─ 🎚  convert to Opus voice-note (ffmpeg)
    ├─ 🖼  post thumbnail + caption to the channel
    └─ 🎧 post the audio to the channel   ✅
```

### ⚡ `.ping`

```text
Pong! ⚡
Speed: 120ms
Runtime: 2 hours, 5 minutes, 10 seconds
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🔎 How to Get a Channel JID

A channel JID looks like `120363xxxxxxxxxxxxxx@newsletter`.

1. Open your channel in WhatsApp and copy its invite link
   (`https://whatsapp.com/channel/XXXXXXXX`)
2. Resolve the link to a JID with a small helper script, or any tool that reads the newsletter metadata
3. Use that JID in `.csong`

> ⚠️ The linked account must be an **admin / owner** of the channel to post.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🎨 Customize the Caption

Open **`wa.js`**, find the `csong` case and edit the caption:

```js
const caption =
`*🪸 ${global.namabot}*

> _*🧃 Title*_ : \`${info.title}\`
> _*🎤 Channel*_ : \`${info.channel || 'Unknown'}\`
> _*🪺 Duration*_ : \`${info.duration || 'Unknown'}\`
> _*Thanks For Checking Our Bot!! 😌✨*_`;
```

Available values: `info.title`, `info.channel`, `info.duration`, `info.views`, `info.url`, `info.thumb`.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🧩 How the Song Scraper Works

`lib/ytdl.js` is a self-contained scraper (no external API server of your own):

| Function | Purpose |
|---|---|
| `search(query, n)` | Searches YouTube and returns up to `n` videos |
| `linkInfo(link)` | Gets title / channel / thumbnail for a pasted link |
| `fetchDownload(link, format)` | Gets a direct download URL (`mp3`, `360`, `480`, `720`, `1080`) |
| `ytdl(queryOrLink, format)` | All-in-one: name or link → `{ info, format, downloadUrl }` |

Optional: set your own key with an environment variable:

```bash
YT_SAVE_KEY=your_key npm start
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🛠 Troubleshooting

| Problem | Fix |
|---|---|
| `ffmpeg: not found` | Install ffmpeg (see Requirements) |
| QR not scanning | Make the terminal wider or zoom out, or use `pair` mode |
| Pair code rejected | Use number with country code only, no `+` or spaces |
| `savenow timed out` | Try again; the download service may be busy |
| Nothing posts to channel | Check the JID and that your account is channel admin |
| Stuck after logout | Delete the `session/` folder and log in again |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🛡 Disclaimer

This project is for **educational purposes only**. Respect copyright and WhatsApp's Terms of Service. The developer is not responsible for any misuse or account bans.

## 👑 Author

<div align="center">

**👤 Owner:** @DanuZz &nbsp;•&nbsp; **🤖 Bot:** Base-Dxz &nbsp;•&nbsp; **🔖 Version:** 1.0.1

⭐ If you like this project, don't forget to star the repo ⭐

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=120&section=footer" width="100%" />

</div>
