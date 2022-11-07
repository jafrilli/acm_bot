import ContextMenuCommand, {
  ContextMenuCommandContext,
} from "../../api/interaction/contextmenucommand";
import * as assert from "assert";
import { ApplicationCommandType } from "discord.js";

export default class ReportContextMenuCommand extends ContextMenuCommand {
  public constructor() {
    super({
      name: "Report Message",
      type: ApplicationCommandType.User,
    });
  }

  /**
   * Simple command, additional customizations
   * @protected
   */
  protected buildSlashCommand() {}

  public async handleInteraction({
    bot,
    interaction,
  }: ContextMenuCommandContext): Promise<void> {
    // Ensure this is a message (just for the ts assert)

    assert.ok(interaction.isContextMenuCommand());

    await bot.managers.report.handleInitialReport(interaction);
  }
}
