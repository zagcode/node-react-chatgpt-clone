require("dotenv").config()

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

module.exports = class openrouter{

	static async chatCompletion({prompt}){
		const response = await fetch(OPENROUTER_URL, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
				'Content-Type': 'application/json',
				'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:3000',
				'X-Title': process.env.OPENROUTER_APP_NAME || 'node-react-chatgpt-clone',
			},
			body: JSON.stringify({
				model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
				messages: [{ role: 'user', content: `${prompt}` }],
				temperature: 0,
				max_tokens: 3500,
			})
		})

		const data = await response.json()

		if (!response.ok || data.error) {
			const error = new Error('OpenRouter request failed')
			error.response = { data: data.error || data }
			throw error
		}

		return data.choices[0].message.content
	}
}
