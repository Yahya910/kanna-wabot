let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let { performance } = require('perf_hooks')
let neww = Math.round(performance.now())
let old = Math.round(performance.now())
const chats = conn.chats.all()
const groups = chats.filter(v => v.jid.endsWith('g.us'))
const defaultMenu = {
  before: `
╭─────═[ *حالتك* ]═─────⋆
│╭───────────────···
┴│▸ *الاسم:* %name
⬡│▸ *العضوية:* %prems
⬡│▸ *العمر:* %age
⬡│▸ *الحد:* %limit
⬡│▸ *الاموال:* %money
⬡│▸ *الدور:* %role
⬡│▸ *المستوى:* %level [%xp4levelup]
⬡│▸ *نقاط:* %exp / %maxexp
┬│▸ *مجموع النقاط:* %totalexp
│╰────────────────···
┠─────═[ *اليوم* ]═─────⋆
│╭────────────────···
┴│    *${ucapan()} %name!*
⬡│▸ *التاريخ:* %week %weton, %date
⬡│▸ *التاريخ الهجري:* %dateIslamic
┬│▸ *التوقيت:* %time
│╰────────────────···
┠─────═[ *معلومات حول البوت* ]═─────⋆
│╭────────────────···
┴│▸ *اسم البوت:*  kanna wabot من صنع و تطوير ايانوكوجي
⬡│▸ *الوضع:* ${global.opts['self'] ? 'خاص' : 'عام'}
⬡│▸ *جهاز البوت:* IPhone 13
⬡│▸ *سرعة:* ${neww - old} ms
⬡│▸ *الشارج:* ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
⬡│▸ *محرك البحث:* Unbuntu linux
⬡│▸ *مدة الاشتغال:* %uptime (%muptime)
┬│▸ *المطور :* yahya
│╰────────────────···
╰──────────═┅═──────────
%readmore`.trimStart(),
  header: '╭═[ *%category* ]═────···\n┴',
  body: '│◌ ⃝✧⪼ %cmd %islimit %isPremium',
  footer: '┬\n╰───────────···',
  after: `⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕.
     %me
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
	let bzz = './audio/robot.m4a'
	let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw } = global.db.data.settings[conn.user.jid]
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'edukasi', 'news', 'nsfw', 'xp', 'stiker', 'image', 'anime', 'kerangajaib', 'quotes', 'admin', 'rpg', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'vote', 'tanpakategori', 'owner', 'gift', 'thnks']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'rpg': 'Epic Rpg',
    'xp': 'Exp & Limit',
    'fun': 'Fun',
    'jodoh': 'Jodoh',
    'gift': 'Gift',
    'anime': 'Anime',
    'hentai': `NSFW`,
    'premium': 'Premium',
    'anonymous': 'Anonymous Chat',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'absen': 'Absen',
    'voting': 'vote',
    'admin': `Admin`,
    'group': 'Grup',
    'news': 'News',
    'internet': 'Internet',
    'edukasi': 'Edukasi',
    'quran': 'Islam',
    'image': 'Random Image',
    'sticker': 'Stiker',
    'nulis': 'MagerNulis & Logo',
    'audio': 'Pengubah Suara',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'database': 'Database',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
    'thnks': 'THANKS TO',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'nsfw') tags = {
    'hentai': 'NSFW',
    'nsfw': 'HENTAI',
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Epic Rpg'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Random Image'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun',
    'jodoh': 'Jodoh'
  }
  if (teks == 'jodoh') tags = {
    'jodoh': 'Jodoh'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
    if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'quran') tags = {
    'quran': 'Islam'
  }
  if (teks == 'gift') tags = {
    'gift': 'Gift'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'thnks') tags = {
    'thnks': 'THANKS TO'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { money, age, exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let premium = global.db.data.users[m.sender].premium
    let prems = `${premium ? 'Yes': 'No'}`
    let wm = global.botwm
    let logo = global.logo
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `✧────────···[ كونيتشيوا ]···─────────✧`.trim(),
          "description": `${ucapan()}, ${name} !`.trim(),
          "footerText": `╭━━━━━━━━━━━━━━━━┈─✧

┬
├━━━━━━━━━━━━━━━━┈─⋆
┴  
✧
┬ 📌 𝗣𝗶𝗻𝗻𝗲𝗱 :
│ هناك طريقان للحصول على العضوية :
▸ الاشتراك في قنوات المطور
▸ ثانيا الدفع 
╰━━━━━━━━━━━━━━━━┈─◂
     ▌│█║▌║▌║║▌║▌║█│▌
     
     ${week}, ${date}`,
          "buttonText": "Click Here!",
          "listType": "SINGLE_SELECT",
          "sections": [
                            {
                                "rows": [{
                                         "title": "[📊] الحالة",
                                         "description": "حالة Kanna Bot",
                                         "rowId": ".botstat"
                                    }, {
                                         "title": "[⚡] سرعة",
                                         "description": "سرعة استجابة البوت",
                                         "rowId": ".ping"
                                    }, {
                                         "title": "[🗒️] معلومات",
                                         "description": "حول البوت",
                                         "rowId": ".info"
                                    }, {
                                         "title": "[🎐] المطور",
                                         "description": "صاحب البوت^~^",
                                         "rowId": ".nowner"
                       }],
                    "title": "✧───────────────[ القائمة ]───────────────✧"
                }, {
                  "rows": [{
                  "title": "Menu 01 |🧾|",
                  "description": "الكل",
                  "rowId": ".? all"
                }, {
                  "title": "Menu 02 |🎮|",
                  "description": "الالعاب",
                  "rowId": ".? game"
                }, {
                  "title": "Menu 03 |🌱|",
                  "description": "RPG",
                  "rowId": ".? rpg"
                }, {
                  "title": "Menu 04 |✨|",
                  "description": "النقاط",
                  "rowId": ".? xp"
                }, {
                  "title": "Menu 05 |🧩|",
                  "description": "متعة",
                  "rowId": ".? fun"
                }, {
                  "title": "Menu 06 |🎁|",
                  "description": "هدايا",
                  "rowId": ".? gift"
                }, {
                  "title": "Menu 07 |🔞|",
                  "description": "حرام",
                  "rowId": ".? nsfw"
                }, {
                  "title": "Menu 08 |⛩️|",
                  "description": "انمي",
                  "rowId": ".? anime"
                }, {
                  "title": "Menu 09 |📰|",
                  "description": "اخبار",
                  "rowId": ".? News"
                },  {
                  "title": "Menu 10 |🕋|",
                  "description": "اسلام",
                  "rowId": ".? quran"
                }, {
                  "title": "Menu 11 |🏫|",
                  "description": "القديسية",
                  "rowId": ".? edukasi"
                }, {
                  "title": "Menu 12 |🖼️|",
                  "description": "صور عشوائية",
                  "rowId": ".? image"
                },  {
                  "title": "Menu 13 |🎫|",
                  "description": "ستيكر",
                  "rowId": ".? stiker"
                }, {
                  "title": "Menu 14 |🐚|",
                  "description": "نسيت",
                  "rowId": ".? kerangajaib"
                }, {
                  "title": "Menu 15 |📑|",
                  "description": "حول",
                  "rowId": ".? quotes"
                }, {
                  "title": "Menu 16 |👑|",
                  "description": "ادمن",
                  "rowId": ".? admin"
                }, {
                  "title": "Menu 17 |👥|",
                  "description": "مجموعة",
                  "rowId": ".? grup"
                }, {
                  "title": "Menu 18 |🌟|",
                  "description": "أعضاء المهمين",
                  "rowId": ".? premium"
                }, {
                  "title": "Menu 19 |💻|",
                  "description": "انترنت",
                  "rowId": ".? internet"
                }, {
                  "title": "Menu 20 |🎭|",
                  "description": "لبدء محادثة هكر",
                  "rowId": ".? anonymous"
                }, {
                  "title": "Menu 21 |✍️|",
                  "description": "لوغو",
                  "rowId": ".? nulis"
                }, {
                  "title": "Menu 22 |📥|",
                  "description": "تحميلات",
                  "rowId": ".? downloader"
                }, {
                  "title": "Menu 23 |🧰|",
                  "description": "الادوات",
                  "rowId": ".? tools"
                }, {
                  "title": "Menu 24 |📂|",
                  "description": "داتا",
                  "rowId": ".? database"
                }, {
                  "title": "Menu 25 |🗳️|",
                  "description": "التصويت و الغياب",
                  "rowId": ".? vote"
                }, {
                  "title": "Menu 26 |🎙️|",
                  "description": "مغير الصوت",
                  "rowId": ".? audio"
                }, {
                  "title": "Menu 27 |🤖|",
                  "description": "الحصول على البوت : خاص ",
                  "rowId": ".? jadibot"
                }, {
                  "title": "Menu 28 |ℹ️|",
                  "description": "معلومات",
                  "rowId": ".? info"
                }, {
                  "title": "Menu 29 |❓|",
                  "description": "لا شيء",
                  "rowId": ".? tanpakategori"
                }, {
                  "title": "Menu 30 | 🧑‍💻|",
                  "description": "المبرمج",
                  "rowId": ".? owner"
                }],
                                "title": "✧────────────────[ معلومات ]────────────────✧"
                            }
                        ], "contextInfo": 
                         { "stanzaId": m.key.id,
                        "participant": m.sender,
                        "quotedMessage": m.message
                        }
                    }
                 }, {}), {waitForAck: true})
  
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      money, age, prems, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    // await conn.send3ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), '🎮 Ƙαɴɴα вσт', 'Owner', '.owner', 'Donasi', '.donasi', 'Rules', '.infobot', m)
    await conn.send3ButtonLoc(m.chat, logo, '──────────[ *DASHBOARD* ]──────────', text.trim(), 'Owner', '.nowner', 'Donasi', '.donasi', 'Rules', '.rules', m)
    let nama = await conn.getName(m.sender)
    let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}


  logo2 = global.logo
  kanna = fs.readFileSync('./src/logo3.jpg')
  kannaImg = (await conn.prepareMessage('0@s.whatsapp.net', kanna, MessageType.image, { thumbnail: Buffer.alloc(0) })).message.imageMessage
  sumberImg = await (await fetch(fla + teks + ' menu')).buffer()
  image = (await conn.prepareMessage('0@s.whatsapp.net', logo2, MessageType.image, { thumbnail: Buffer.alloc(0) })).message.imageMessage
  /*res = await conn.prepareMessageFromContent(m.chat, {
    "productMessage": {
      "product": {
        "productImage": image,
        "productId": "4938174216214248",
        "title": '✧───────···[ Menu ]···────────✧',
        "description": `\n${wm}\n` + text,
        "retailerId": `${week}, ${date}  |  ʙʏ ʟᴇᴛᴛᴀ-sᴀᴍᴀ ‷♪`,
        "url": '\n',
        "descriptionCount": "999999999",
        "productImageCount": "1",
      },
      "businessOwnerJid": "0@s.whatsapp.net",
      "contextInfo": {
        "forwardingScore": 9999,
        "isForwarded": true
      }
    }
  },
    { quoted: fkon })
  conn.relayWAMessage(res)*/
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', '?', 'help']
handler.tags = ['main']
handler.command = /^(menu|\?|help)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi 🌄"
  }
  if (time > 10) {
    res = "Selamat siang ☀️"
  }
  if (time >= 15) {
    res = "Selamat sore 🌇"
  }
  if (time >= 18) {
    res = "Selamat malam 🌙"
  }
  return res
}
