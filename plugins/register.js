const { createHash } = require('crypto')
let fetch = require('node-fetch')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix, command }) {
	let sn = createHash('md5').update(m.sender).digest('hex')
  let user = global.db.data.users[m.sender]
  let namae = conn.getName(m.sender)
  if (user.registered === true) return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": '*تسجيل*',
          "description": '📮أنت مسجّل بالفعل! أتريد إعادة التسجيل؟',
          "footerText": global.botdate,
          "buttonText": "بوت ايانوكوجي",
          "listType": "SINGLE_SELECT",
          "sections": [
                            {
                                "rows": [{
                                         "title": `قائمة الأوامر`,
                                         "description": "List Menu Kanna BOT",
                                         "rowId": ".menu"
                                    }, {
                                         "title": `صاحب البوت`,
                                         "description": "List Owner Kanna BOT", 
                                         "rowId": ".nowner"
                                    }, {
                                         "title": `تسجيل الخروج`,
                                         "description": "Daftar Ulang",
                                         "rowId": '.unreg ' + sn
                       }],
                    "title": "صنع من طرف ايانوكوجي ساما"
                  }
                        ], "contextInfo": 
                         { "stanzaId": m.key.id,
                        "participant": m.sender,
                        "quotedMessage": m.message
                        }
                      }
                     }, {quoted: m, contexInfo: { mentionedJid: [m.sender]}}), {waitForAck: true})
  if (!Reg.test(text)) return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": '*── 「 عليك التسجيل اولا 」 ──*',
          "description": `
📮 أرجوك إختر عمرك`,
          "footerText": global.botdate,
          "buttonText": "تسجيل",
          "listType": "SINGLE_SELECT",
          "sections": [
                            {
                                "rows": [{
                                         "title": '27 سنة',
                                         "rowId": '.daftar ' + namae + '.27'
                                    }, {
                                         "title": '26 سنة',
                                         "rowId": '.daftar ' + namae + '.26'
                                    }, {
                                    	"title": '25 سنة',
                                         "rowId": '.daftar ' + namae + '.25'
                                    }, {
                                    	"title": '24 سنة',
                                         "rowId": '.daftar ' + namae + '.24'
                                    }, {
                                    	"title": '23 سنة',
                                         "rowId": '.daftar ' + namae + '.23'
                                    }, {
                                    	"title": '22 سنة',
                                         "rowId": '.daftar ' + namae + '.22'
                                    }, {
                                    	"title": '21 سنة',
                                         "rowId": '.daftar ' + namae + '.21'
                                    }, {
                                    	"title": '20 سنة',
                                         "rowId": '.daftar ' + namae + '.20'
                                    }, {
                                    	"title": '19 سنة',
                                         "rowId": '.daftar ' + namae + '.19'
                                    }, {
                                    	"title": '18 سنة',
                                         "rowId": '.daftar ' + namae + '.18'
                                    }, {
                                    	"title": '17 سنة',
                                         "rowId": '.daftar ' + namae + '.17'
                                    }, {
                                    	"title": '16 سنة',
                                         "rowId": '.daftar ' + namae + '.16'
                                    }, {
                                    	"title": '15 سنة',
                                         "rowId": '.daftar ' + namae + '.15'
                                    }, {
                                    	"title": '14 سنة',
                                         "rowId": '.daftar ' + namae + '.14'
                                    }, {
                                    	"title": '13 سنة',
                                         "rowId": '.daftar ' + namae + '.13'
                                    }, {
                                    	"title": '12 سنة',
                                         "rowId": '.daftar ' + namae + '.12'
                                    }, {
                                    	"title": '11 سنة',
                                         "rowId": '.daftar ' + namae + '.11'
                                    }, {
                                    	"title": '10 سنوات',
                                         "rowId": '.daftar ' + namae + '.10'
                                         }, {
                                    	"title": '9 سنوات',
                                         "rowId": '.daftar ' + namae + '.9'
                       }],
                    "title": "أرجوك إختر عمرك!"
                  }
                        ], "contextInfo": 
                         { "stanzaId": m.key.id,
                        "participant": m.sender,
                        "quotedMessage": m.message
                        }
                      }
                     }, {quoted: m, contexInfo: { mentionedJid: [m.sender]}}), {waitForAck: true})
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Nama tidak boleh kosong (Alphanumeric)'
  if (!age) throw 'Umur tidak boleh kosong (Angka)'
  age = parseInt(age)
  if (age > 70) throw 'Umur anda terlalu tua'
  if (age < 5) throw 'Maaf, minimal 10 tahun'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
 
  let str = `
╭───[ *تم تسجيل* ]───
│• *الاسم* : ${name}
│• *العمر* : ${age} tahun
│• *كود التسجيل* : ${sn}
│• *الأيدي* : ${pickRandom(['GGA0QH119J1','JPA017P02HA1','PWJROSAIEJ','LAOFOODJQ','PWJFCIFIF','QBBVAODEPZ','QPWEJDNDJD','IQPQBAHSIF','UWUWIWOKPF','PQJDXBXB','AKSJALPQDN','HALAKDILQU','IAIIWIICCIS','KQPSNWO','BSBANSKA','JANSNDKSOS','JDKALDKKAPPPP','KAKALALPCLCLJA','PWWJ017027GA14','19QPDKALLH61J','PWJSJDDUYSYSHSU','1001UQOXJ9JJDY','PQPSODUE107','BBBAKZOOX','00071','WKESOAKWLA','104JALOA9','OSBDOSODO','PWODJDOSKFJSOO','OWJCKEOS','PAJDISO','OSJDOWO','BABAOALKS','PWKW827LA9PA0','PWOEOOOJF','LCKDI2027H393P','IWUEUJEDGWEUEUE','GGGGGGGGHQJU127','HAGFUUXUQP3','P0000009769767T0O87Y5','0TT9I4UO43','P7YYRE8583E6','NZNSJEO','P8Y4W38P0R','P8R6IOP4EU-HG0','0729OWRU','JJJJJJJJAGFIS0W67','000087','BbL016JJQBCSr54OwwW0','BbJdQ0X37ohL016HhqK','BbJdQ0X37ohL016HhqK','GgGddSsssss1039','HAOSOWODJSO','BVjd173k6BEk','AEOKKAKSKKAK20468','BBWUK017KASK','COLIMAJSOAOOAOK1','1238PBLLWO20','KODE123','jajsoskskskOOoO0292','GAGHWPPWSIJ','PWEUPiwpepwp02928','000000723','QPWOEJSJAL','BBAHUSQPEI','HHGGGAGAGODPF','PUS1383PW0292838','HHHB203828LALJK','FFAFUAFAGGAFAFOWVA','PWKDIAPDHZOA','QPWOEUDMZ','103838PW02XLAK','AWOAOAKSPAJDOA','bbbaoduwuslp','kawpajeif','1037pWjs0273BBNjK1','Or4nGB3g04N71nk','Hhhhhhhpwishahhhh','Paosjsh102','Vvvavahsi239hOwpP','PAH103891','RAPEHAL028473','0193910392','103892928','0293829293','02838292','WPPPJSUEUND','01387482923828','gqlI000iwhBYYj0239','DGAOOW','PWOEUDOAO','OSODODOEOEIE','OWRHWOKDIRE','BXKKWCOEDMJCIE','BBDGWOPDDMEO','148920392949202','WOEIOWEOO','19388292929383','MODARSIAHANJINK','BEBEOAODAPJ','LVOWOWIEPADH','AIMALIVETOGOW','JUSTSKOSAO','PW2039LSHDOW','BVOVOVOVUUDEUA307','027492838','01398293','TAPIUPITKAOE103982','019382939','02848292838','OWOWOWOJDJADJLA019','PE023802794949nbK','owjfLjsoKhIOauwo','JKlskeoKJJTRYOJc','IHUOFEtUKPJVD302','HJPgFTIBDTI','029292848','IgwoekdkdomsB','HJOKJYYUlns','INNSAPTAILOEAJD','TAIANJSGSIAOPA','0238829103','02838385842111','9372893739991','BACHEUADL','RC047','BRAINTLUBA0284','DDDDDDDSALDKOE1048','11020393910101010201047GbkL','BrADIopaSLyeYA','JSJDJAKDSKLLLLAPRO','PROGAMERYT123','47492837','923772','BACHELAOF','1038828282','VAKDPOESMAQ0079'])}
│• *الحالة* : ☑️
╰──────···─────࿐`.trim()
conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": '───────── *تسجيل* ─────────',
          "description": str,
          "footerText": global.botdate,
          "buttonText": "Kanna BOT",
          "listType": "SINGLE_SELECT",
          "sections": [
                            {
                                "rows": [{
                                         "title": `قائمة الاوامر`,
                                         "description": "قائمة اوامر Kanna BOT",
                                         "rowId": ".menu"
                                    }, {
                                         "title": `كود التسجيل`,
                                         "description": "كود  sn الخاص بي", 
                                         "rowId": `.codereg ${pickRandom(['070698', '661528', '878588', '775636', '098786'])}`
                                    }, {
                                         "title": `بروفايل`,
                                         "description": "صفحتي!",
                                         "rowId": '.pp'
                       }],
                    "title": "صنع من طرف ايانوكوجي"
                  }
                        ], "contextInfo": 
                         { "stanzaId": m.key.id,
                        "participant": m.sender,
                        "quotedMessage": m.message
                        }
                      }
                     }, {quoted: fkon, contexInfo: { mentionedJid: [m.sender]}}), {waitForAck: true})

}
handler.help = ['verify', 'daftar']
handler.tags = ['xp']

handler.command = /^(verify|daftar|reg(ister)?)$/i

module.exports = handler
let wm = global.botwm

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
