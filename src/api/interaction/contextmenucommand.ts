import {
  ApplicationCommandPermissionData,
  CommandInteraction,
  ContextMenuInteraction,
  Interaction,
} from "discord.js";
import {
  ContextMenuCommandBuilder,
  ContextMenuCommandType,
  SlashCommandBuilder,
} from "@discordjs/builders";
import BaseInteraction, {
  InteractionConfig,
  InteractionContext,
} from "./interaction";
import Bot from "../bot";

export interface ContextMenuCommandConfig extends InteractionConfig {
  type: ContextMenuCommandType;
  permissions?: ApplicationCommandPermissionData[];
}

export interface ContextMenuCommandContext extends InteractionContext {
  interaction: ContextMenuInteraction;
}

export default abstract class ContextMenuCommand extends BaseInteraction {
  public readonly type: ContextMenuCommandType;
  public readonly permissions: ApplicationCommandPermissionData[] | undefined;

  protected readonly cmCommand: ContextMenuCommandBuilder =
    new ContextMenuCommandBuilder();

  get contextMenuCommandJson() {
    return this.cmCommand.toJSON();
  }

  protected constructor(config: ContextMenuCommandConfig) {
    super(config);

    // Pull slash command configs
    this.type = config.type;
    if (config.permissions) {
      this.permissions = config.permissions;
    }

    // Build command
    this.buildContextMenuCommandFromConfig();
  }

  private buildContextMenuCommandFromConfig() {
    this.cmCommand.setName(this.name);
    this.cmCommand.setType(this.type);
    if (this.permissions) this.cmCommand.setDefaultPermission(false);
  }

  public abstract handleInteraction(context: ContextMenuCommandContext);
}