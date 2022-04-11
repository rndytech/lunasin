const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const fs = require("fs")
const axios = require('axios')
const os = require('os')
const speed = require("performance-now")
const util = require('util')
const crypto = require('crypto')
const request = require('request')
const { exec, spawn } = require('child_process')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const { fetchJosn, fetchText } = require('./lib/fetcher')
const { color, bgcolor } = require('./lib/color')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const setting = JSON.parse(fs.readFileSync('./setting.json'))

owner = setting.OwnerNumber
botname = setting.BotName
ownername = setting.OwnerName
const fakeimage = fs.readFileSync ('./media/logo.jpg')
const thumb = fs.readFileSync ('./media/thumb.jpg')
wk = '```'

const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))

const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if(time2 < "23:59:00"){
        var ucapanWaktu = 'Selamat Malam 🌌'
}
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'Selamat Petang 🌆'
}
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'Selamat Sore 🌇'
}
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'Selamat Siang 🏞'
}
        if(time2 < "11:00:00"){
        var ucapanWaktu = 'Selamat Pagi 🌅'
}
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'Selamat malam 🏙'
}

module.exports = Dhani = async (Dhani, mek, _welkom) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.blocked
    	mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
		const tanggal = moment.tz('Asia/Jakarta').format('dddd') + ', ' + moment.tz('Asia/Jakarta').format('LL')
		const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
		const timeMak = moment().tz('Asia/Makassar').format("HH:mm:ss");
        const timeJay = moment().tz('Asia/Jayapura').format("HH:mm:ss");
        const type = Object.keys(mek.message)[0]        
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        const prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : '#'          	
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
		const args = body.trim().split(/ +/).slice(1)
		const arg = budy.slice(command.length + 2, budy.length)
		const c = args.join(' ')
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')
		const txt = mek.message.conversation
		const botNumber = Dhani.user.jid
		const ownerNumber = [`${owner}@s.whatsapp.net`, `6281333603591@s.whatsapp.net`]
		const isGroup = from.endsWith('@g.us')
		let sender = isGroup ? mek.participant : mek.key.remoteJid
		let senderr = mek.key.fromMe ? Dhani.user.jid : mek.key.remoteJid.endsWith('@g.us') ? mek.participant : mek.key.remoteJid
		const groupMetadata = isGroup ? await Dhani.groupMetadata(from) : ''.toString
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const conts = mek.key.fromMe ? Dhani.user.jid : Dhani.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? Dhani.user.name : conts.notify || conts.vname || conts.name || '-'    
    
		const isWelkom = isGroup ? _welkom.includes(from) : false
		const isOwner = ownerNumber.includes(sender)

mess = {
verify: `Hai ${pushname} Sebelum memakai bot silakan daftar dulu ketik ${prefix}daftar`,
wait: 'Proses kak',
eror: 'Maaf terjadi kesalahan !!',
success: 'Sukses️',
error: {
stick: 'Itu bukan sticker kak !!',
Iv: 'Link invalid !!'
},
only: {
prem: 'Fitur khusus member premium !!',
group: 'Fitur khusus grup !!',
owner: 'Fitur khusus owner !!',
admin: 'Fitur khusus admin !!',
Badmin: 'Silakan jadikan bot admin dulu !!'
}
}

const math = (teks) => {
return Math.floor(teks)
}
const runtime = function (seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor((seconds % (3600 * 24)) / 3600);
var m = Math.floor((seconds % 3600) / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " Hari, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " Jam, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " Menit, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " Detik") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
};

const sendButton = async (from, context, fortext, but, mek) => {
buttonMessages = {
contentText: context,
footerText: fortext,
buttons: but,
headerType: 1
}
Dhani.sendMessage(from, buttonMessages, buttonsMessage, {
quoted: fgi
})
}
const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
const buttonMessage = {
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 1
}
Dhani.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options)
}
const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
kma = gam1
mhan = await Dhani.prepareMessage(from, kma, image)
const buttonMessages = {
imageMessage: mhan.message.imageMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 4
}
Dhani.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}
const sendButVideo = async(id, text1, desc1, vid1, but = [], options = {}) => {
kma = vid1
mhan = await Dhani.prepareMessage(from, kma, video)
const buttonMessages = {
videoMessage: mhan.message.videoMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 5
}
Dhani.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}
const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
kma = gam1
mhan = await Dhani.prepareMessage(from, kma, location)
const buttonMessages = {
locationMessage: mhan.message.locationMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 6
}
Dhani.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}
const listmsg = (from, title, desc, list) => {
let po = Dhani.prepareMessageFromContent(from, {"listMessage": {"title": title,"description": desc,"buttonText": "KLIK MENU LUNASINTOPUP YA KAK!","footerText": `${botname}`,"listType": "SINGLE_SELECT","sections": list}}, {})
return Dhani.relayWAMessage(po, {waitForAck: true})
}
const reply = (teks) => {
Dhani.sendMessage(from, teks, text, {quoted:mek})
}
const sendMess = (hehe, teks) => {
Dhani.sendMessage(hehe, teks, text)
}
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? Dhani.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : Dhani.sendMessage(from, teks.trim(), extendedText, { quoted: fgi, contextInfo: { "mentionedJid": memberr } })
}
const costum = (pesan, tipe, target, target2) => {
Dhani.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
}
const ftrol = { key : { participant : '0@s.whatsapp.net' }, message: { orderMessage: { itemCount : 5555, status: 1, surface : 1, message: `${ucapanWaktu} ${pushname}`, orderTitle: `${ucapanWaktu} ${pushname}`, thumbnail: thumb, sellerJid: '0@s.whatsapp.net' }}}
const fgi = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {}) }, message: { "videoMessage": { "title": `${ucapanWaktu} ${pushname}`, "h": `${ucapanWaktu} ${pushname}`, 'duration': '99999', 'gifPlayback': 'true', 'caption': `${ucapanWaktu} ${pushname}`, 'jpegThumbnail': thumb }}}
const textImg = (teks) => { return Dhani.sendMessage(from, teks, text, {quoted: fgi, thumbnail: fs.readFileSync('./media/thumb.jpg')})}
const fakeitem = (teks) => { Dhani.sendMessage(from, teks, text, { quoted: { key:{ fromMe:false, participant:`0@s.whatsapp.net`, ...(from ? { remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync("./media/thumb.jpg"),"itemCount":9999999999,"status":"INQUIRY","surface":"CATALOG","message": `${ucapanWaktu} ${pushname}`,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},contextInfo: {"forwardingScore":999,"isForwarded":true}, sendEphemeral: true})}

const getRegisteredRandomId = () => {
return _registered[Math.floor(Math.random() * _registered.length)].id
}
const addRegisteredUser = (userid, sender, age, time, serials) => {
const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
_registered.push(obj)
fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
}
const checkRegisteredUser = (sender) => {
let status = false
Object.keys(_registered).forEach((i) => {
if (_registered[i].id === sender) {
status = true
}
})
return status
}

const isRegistered = checkRegisteredUser(sender)

const sendButRegis = (id, text1, desc1, but = [], options = {}) => {
const buttonMessage = {
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 1,
};
Dhani.sendMessage(
id,
buttonMessage,
MessageType.buttonsMessage,
options
);
};

const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
if (!isGroup && isCmd) console.log('\x1b[1;31m[ PC\x1b[1;37m ]', '[\x1b[1;32m PRIBADI \x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
if (isCmd && isGroup) console.log('\x1b[1;31m[ GC\x1b[1;37m ]', '[\x1b[1;32m GROUP \x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
switch (command) {
//ADD FITUR DI BAWAH SINI!!

case 'menu':
case 'help':
if (!isRegistered) return reply(mess.verify)
const menu = `Hi ${pushname} ${ucapanWaktu}

\`\`\`❏「 WAKTU INDONESIA 」\`\`\`
*Tanggal* : ${tanggal}
*Wib* : ${time}
*Wita* : ${timeMak}
*Wit* : ${timeJay}


*「 GROUP MENU 」*
${prefix}welcome *on/off*

*「 STORE MENU 」*
d
${prefix}list`
fakeitem(menu)
break

case 'mlbbfast':
if (!isRegistered) return reply(mess.verify)
const menu = `*MOBILE LEGENDS FAST*
_Proses 1-30 Menit Max 3 Jam_

86        💎 = 𝙍𝙥 21.444
172      💎 = 𝙍𝙥 42.027
257      💎 = 𝙍𝙥 62.777
344      💎 = 𝙍𝙥 84.578
429      💎 = 𝙍𝙥 105.823
514      💎 = 𝙍𝙥 127.938
600      💎 = 𝙍𝙥 142.384
706      💎 = 𝙍𝙥 167.823
1050    💎 = 𝙍𝙥 239.460
2195    💎 = 𝙍𝙥 478.839
3688    💎 = 𝙍𝙥 837.928`
reply(menu)
break
case 'fffast':
if (!isRegistered) return reply(mess.verify)
const menu = `*FREE FIRE FAST VIA ID*
_Proses 1-10 Menit Max 3 Jam_

50     💎 = 𝙍𝙥 6.695
70     💎 = 𝙍𝙥 9.207
140   💎 = 𝙍𝙥 18.392
210   💎 = 𝙍𝙥 27.199
355   💎 = 𝙍𝙥 46.005
500   💎 = 𝙍𝙥 63.992
720   💎 = 𝙍𝙥 91.838
1000 💎 = 𝙍𝙥 124.584
1440 💎 = 𝙍𝙥 183.113
2000 💎 = 𝙍𝙥 250.921
7290 💎 = 𝙍𝙥 910.823

_*M. Mingguan*_ = 𝙍𝙥 27.900
_*M. Bulanan*_ = 𝙍𝙥 139.100`
reply(menu)
break
case 'slighttwilight':
if (!isRegistered) return reply(mess.verify)
const menu = `*STARLIGHT / TWILIGHT FAST*
_Proses 1-30 Menit Max 3 Jam_

_*Starlight*_ = 𝙍𝙥 105.000
_*Twilight*_  = 𝙍𝙥 105.000`
reply(menu)
break
case 'payment':
if (!isRegistered) return reply(mess.verify)
const menu = `*PAYMENT / PEMBAYARAN*
_Transfer sesuai nominal pembelian & sertakan buktinya_

✅ Dana : *belum tersedia*
✅ Ovo   : *081312533066*
✅ Gopay : *081312533066*
✅ Shopee Pay : *081312533066*
✅ Qris : *Minta ke admin kak*
✅ Alfa / Indomart : *Minta kode pembayaran ke admin + 2.500 fee ritel*

*Nomor admin sama dengan nomor pembayaran*😊
*SALDO BELUM MASUK TIDAK AKAN DIPROSES*
*KALAU MAU TF DARI BANK > E-WALLET DIATAS WAJIB TANYA DULU KE ADMIN*`
reply(menu)
break
case 'list':
if (!isRegistered) return reply(mess.verify)
               list = []
               listmenu = [`mlbbfast`,`fffast`,`slighttwilight`,`payment`]
               listmenuu = [`MOBILE LEGEND FAST`,`FREE FIRE FAST VIA ID`,`STARLIGHT / TWILIGHT FAST`,`PAYMENT`]
               nombor = 1
               startnum = 0
               for (let x of listmenu) {
               const yy = {title: 'Store ke' + nombor++,
                    rows: [
                       {
                        title: `${listmenuu[startnum++]}`,
                        description: ``,
                        rowId: `${prefix}${x}`
                      }
                    ]
                   }
                        list.push(yy)
           }
               listmsg(from, `Hai ${pushname} pilih store disini`,`  `, list)
               break
               
case 'verify':
case 'daftar':
if (isRegistered) return reply('_Maaf kakak sudah terdaftar_')
const serialUser = createSerial(18)
veri = sender
_registered.push(sender)
fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
addRegisteredUser(sender, serialUser)
const menu = `*「 DAFTAR BERHASIL 」*

├ Nama : ${pushname}
├ Nomor : https://wa.me/${sender.split('@')[0]}
├ ID : ${serialUser}

_*Note*_ :
-Kode ID jangan sampai lupa! Karna Diantara Kodenya adalah kode gift yang berhadiah! Jika Anda Beruntung!😊

Follow Instagram kami :
https://instagram.com/lunasintopup?igshid=YmMyMTA2M2Y=`
reply(menu)
console.log(color('[REGISTER]'), color(time, 'yellow'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
break
        
case 'welcome': 
if (!isRegistered) return reply(mess.verify)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins && !mek.key.fromMe) return reply(mess.only.admin)
if (args[0] === 'on') {
if (isWelkom) return reply('Sudah Aktif Kak')
_welkom.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(_welkom))
reply(`\`\`\`Sukses ✅, Mengaktifkan fitur welcome di group\`\`\` *${groupMetadata.subject}*`)
} else if (args[0] === 'off') {
if (!isWelkom) return reply('Sudah Mati Kak')
var ini = _welkom.indexOf(from)
_welkom.splice(ini, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(_welkom))
reply(`\`\`\`Sukses ✅, Menonaktifkan fitur welcome di group\`\`\` *${groupMetadata.subject}*`)
} else if (!c){
anu =`Silahkan pilih salah satu\nUntuk fitur welcome`
punten = [{buttonId: `${prefix}welcome on`, buttonText: {displayText: 'ON ✔️️'}, type: 1},{buttonId: `${prefix}welcome off`, buttonText: {displayText: 'OFF ❌️'}, type: 1}]
const btngrass = {
contentText: `${anu}`,
footerText: `© ${ownername} || 2022`,
buttons: punten,
headerType: 1
}
await Dhani.sendMessage(from, btngrass, MessageType.buttonsMessage, {quoted: fgi})
}
break
case 'bc': 
if (!isRegistered) return reply(mess.verify)
if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
if (args.length < 1) return reply('textnya mana')
anu = await Dhani.chats.all()
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
buff = await Dhani.downloadMediaMessage(encmedia)
for (let _ of anu) {
Dhani.sendMessage(_.jid, buff, image, {caption: `[ *BROADCAST* ]\n\n${body.slice(4)}`})
}
reply(_.jid)
reply('Sukses Broadcast')
} else {
for (let _ of anu) {
sendMess(_.jid, `[ *BROADCAST* ]\n\n${body.slice(4)}`)
}
reply('Sukses broadcast')
}
break

default:
if (budy == `p`) {
if (!isRegistered) return reply(mess.verify)
if (!isGroup) return reply(mess.only.group)
if (!isOwner && !mek.key.fromMe) return
const menu = `「 *TRANSAKSI PROSES* 」

${wk}📅 TANGGAL  : ${tanggal}${wk}
${wk}⌚ JAM      : ${time} WIB${wk}
${wk}⏳ STATUS   : Proses${wk}


Pesanan⁩ sedang di proses!`
reply(menu)
}
if (budy == `P`) {
if (!isRegistered) return reply(mess.verify)
if (!isGroup) return reply(mess.only.group)
if (!isOwner && !mek.key.fromMe) return
const menu = `「 *TRANSAKSI PROSES* 」

${wk}📅 TANGGAL  : ${tanggal}${wk}
${wk}⌚ JAM      : ${time} WIB${wk}
${wk}⏳ STATUS   : Proses${wk}


Pesanan⁩ sedang di proses!`
reply(menu)
}
if (budy == `d`) {
if (!isRegistered) return reply(mess.verify)
if (!isGroup) return reply(mess.only.group)
if (!isOwner && !mek.key.fromMe) return
const menu = `「 *TRANSAKSI BERHASIL* 」

${wk}📅 TANGGAL  : ${tanggal}${wk}
${wk}⌚ JAM      : ${time} WIB${wk}
${wk}⏳ STATUS   : Berhasil${wk}

Terimakasih,⁩ Next Order ya🙏`
reply(menu)
}
if (budy == `D`) {
if (!isRegistered) return reply(mess.verify)
if (!isGroup) return reply(mess.only.group)
if (!isOwner && !mek.key.fromMe) return
const menu = `「 *TRANSAKSI BERHASIL* 」

${wk}📅 TANGGAL  : ${tanggal}${wk}
${wk}⌚ JAM      : ${time} WIB${wk}
${wk}⏳ STATUS   : Berhasil${wk}

Terimakasih,⁩ Next Order ya🙏`
reply(menu)
}
}
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero") && !e.includes("jid")) {
	console.log('Error : %s', color(e, 'red'))
        }
	// console.log(e)
	}
}