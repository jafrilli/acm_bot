import Event from "../structures/Event";
import ACMClient from "../structures/Bot";
import { settings } from "../botsettings";

export default class ReadyEvent extends Event {
    
    constructor(client: ACMClient) {
        super(client, 'ready');
    }
    
    public async emit(client: ACMClient) {
        client.logger.info('=================== READY START ===================');
        if(client.user) {
            client.logger.info(`Logged in as ${client.user.username}!`);
            var invite = await client.generateInvite(["ADMINISTRATOR"]);
            client.logger.info(invite);
            await client.user.setActivity(settings.activity.description, {type: settings.activity.type})
            client.logger.info(`Set activity to \"${settings.activity.type} ${settings.activity.description}\"`);
        }
        client.logger.info('==================== READY END ====================');
    } 
}