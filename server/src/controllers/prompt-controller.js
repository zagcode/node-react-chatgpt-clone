const inputPrompt = require("../models/input-prompt")
const openrouter = require("../config/openrouter")

module.exports = {
	async sendText(req, res){

		const inputModel = new inputPrompt(req.body)

		try {
			const text = await openrouter.chatCompletion(inputModel)

			return res.status(200).json({
				sucess: true,
				data: text
			})

		} catch (error) {

			return res.status(400).json({
				sucess: false,
				error: error.response
				? error.response.data
				: 'There was an inssue on the server'
			})

		}
	}

}
