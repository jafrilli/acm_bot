import { EmbedBuilder } from "discord.js";
import SlashCommand, {
  SlashCommandContext,
} from "../../api/interaction/slashcommand";
import { APIEmbedField } from "discord-api-types/v10";
import { EmbedBuilder } from "@discordjs/builders";

export default class CopersCommand extends SlashCommand {
  public constructor() {
    super({
      name: "copers",
      description: "Find out who's coping.",
    });
  }

  // Interaction Handled !
  public async handleInteraction({
    bot,
    interaction,
  }: SlashCommandContext): Promise<void> {
    const { member, guild } = interaction;

    const copers = await bot.managers.database.coperFetch();

    const title = `📣 ${member!.user.username} found some copers!`;

    const embed = new EmbedBuilder({
      title,
      fields: copers.map((coper, i) => {
        return {
          name: ["1st", "2nd", "3rd", "4th", "5th"][i],
          value: `<@${coper[0]}> : ${coper[1]} copium`,
        };
      }),
    });
    await interaction.reply({ embeds: [embed], ephemeral: false });
  }
}
