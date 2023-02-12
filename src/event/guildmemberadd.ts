import Event from "../api/event";
import Bot from "../api/bot";
import { GuildMember } from "discord.js";
import { EmbedBuilder } from "@discordjs/builders";

export default class GuildMemberAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMemberAdd");
  }

  public async emit(bot: Bot, member: GuildMember) {
    const embed = new EmbedBuilder({
      title: `**Welcome to the ACM Discord Server!** 🎉`,
      author: {
        name: `The Association for Computing Machinery`,
        icon_url: "https://www.acmutd.co/png/acm-light.png",
        url: "https://acmutd.co/",
      },
      color: 0xec7621,
      footer: {
        text: `Powered by ACM`,
        icon_url: bot.user!.avatarURL() ?? "",
      },
      fields: [
        {
          name: `Step 1: Verify! The links below will become active once you verify.`,
          value: `<#${bot.settings.channels.verification}>`,
        },
        {
          name: `Step 2: Get roles!`,
          value: `<#${bot.settings.channels.roles}>`,
        },
        {
          name: `Step 3: Join Circles (interest groups)!`,
          value: `<#${bot.settings.circles.joinChannel}>`,
        },
      ],
    });
    try {
      const channel = await member.createDM();
      if (channel) {
        await channel.send({ embeds: [embed] });
      }
    } catch (e) {
      bot.managers.error.handleErr(
        e as Error,
        "Error sending welcome message."
      );
      console.error(e);
    }
  }
}
