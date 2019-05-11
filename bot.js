const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "#";

client.on('ready', () => {
	console.log('Ticket Bot is ready...'); 
  });


client.on("message", (message) => {
 
   if (message.content.startsWith(prefix + 'تذكرة') || message.content.startsWith(prefix + 'تذكره'))  {  
        const reason = message.content.split(" ").slice(1).join(" ");  
        
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// ALPHA CODES
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Trial Support.");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });  
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: تم انشاء تذكرتك بنجاح, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `:white_check_mark:  تم إنشاء التذكرة بنجاح , الرجاء كتابة طلبك وسيتم الرد عليك من الدعم الفني بأسرع وقت ممكن , لإغلاق التذكرة اكتب ${prefix}اغلاق`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
 
 
  if (message.content.startsWith(prefix + 'اغلاق')) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`لابمكنك إستخدام امر الإغلاق خارج التذكرة!.`);
 
       message.channel.send(`هل انت متأكد من إغلاق التذكرة؟ للتأكيد اكتب ${prefix}تأكيد`)
           .then((m) => {
               message.channel.awaitMessages(response => response.content === prefix + 'تأكيد', {
                       max: 1,
                       time: 10000,
                       errors: ['time'],
                   })  
                   .then((collected) => {
                       message.channel.delete();
                   })  
                   .catch(() => {
                       m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                           m2.delete();
                       }, 3000);
                   });
           });
   }
 
});






client.on('message', message => {
if (message.content.startsWith(prefix + "uptime")) {
   let uptime = client.uptime;

   let days = 0;
   let hours = 0;
   let minutes = 0;
   let seconds = 0;
   let notCompleted = true;

   while (notCompleted) {

       if (uptime >= 8.64e+7) {

           days++;
           uptime -= 8.64e+7;

       } else if (uptime >= 3.6e+6) {

           hours++;
           uptime -= 3.6e+6;

       } else if (uptime >= 60000) {

           minutes++;
           uptime -= 60000;

       } else if (uptime >= 1000) {
           seconds++;
           uptime -= 1000;

       }

       if (uptime < 1000)  notCompleted = false;

   }

   message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min , ${seconds} sec` + "`");


}
});

 
 client.on("message", message => {

  if (message.content === prefix + 'help') {
   if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**يجب أن تمتلك صلاحيات `ADMINISTRATOR` لرؤية أوامر البوت**' );
message.author.send(`** أوامر بوت التذاكر :-
${prefix}تذكرة = لفتح تذكرة جديدة
${prefix}اغلاق = لإغلاق التذكرة
${prefix}uptime = لرؤية مدة تشغيل البوت 
${prefix}restart = لإعادة تشغيل البوت
${prefix}setname = لتغيير أسم البوت
${prefix}setavatar = لتغيير صورة البوت
**`)
  message.channel.send('**تم إرسال الأوامر على الخاص ✅**')
  }
});
 
 
 client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      
  if (message.content.startsWith(prefix + 'setname')) {
     if(!message.member.hasPermission(`ADMINISTRATOR`)) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
  client.user.setUsername(argresult).then
      message.channel.send(`✅ تم تغيير الأسم إلى **${argresult}** `)
} else
if (message.content.startsWith(prefix + 'setavatar')) {
   if(!message.member.hasPermission(`ADMINISTRATOR`)) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
  client.user.setAvatar(argresult);
    message.channel.send(`تم تغيير صورة البوت بنجاح ✅`);
}
});
 




client.on('message',async message => {
    if(message.content.startsWith(prefix + 'restart')) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**يجب أن تمتلك صلاحيات `ADMINISTRATOR`**' );
        message.channel.send('جاري إعادة تشغيل البوت...')
        setTimeout(() => {
            client.destroy();
            client.login(process.env.BOT_TOKEN);
        },1000);
    }
});


client.login(process.env.BOT_TOKEN);
