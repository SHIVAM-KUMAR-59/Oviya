import { Controller } from "../../lib/types/controller.types";
import { sendSuccess } from "../../lib/utils/response.util";
import Service from "../../services";

const fetchAllWaitlistUserController: Controller = async (req, res, next) => {
    try {
        const waitlistUsers = await Service.waitlistUserService.fetchAllWaitlistUserService();
        sendSuccess(res, "Waitlist users fetched successfully", { waitlistUsers }, 200);
    } catch (err) {
        next(err)
    }
}

export default fetchAllWaitlistUserController