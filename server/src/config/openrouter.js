require("dotenv").config()

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const TIMEOUT_MS = Number(process.env.OPENROUTER_TIMEOUT_MS) || 120000

class OpenRouterError extends Error {
	constructor(message, data){
		super(message)
		this.response = { data: data || { message } }
	}
}

module.exports = class openrouter{

	static async chatCompletion({prompt}){
		if (!prompt || !`${prompt}`.trim()) {
			throw new OpenRouterError('O prompt não pode ser vazio.')
		}

		let response
		let data
		try {
			response = await fetch(OPENROUTER_URL, {
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
				}),
				signal: AbortSignal.timeout(TIMEOUT_MS),
			})
			data = await response.json()
		} catch (error) {
			if (error.name === 'TimeoutError') {
				throw new OpenRouterError(`O modelo não respondeu em ${TIMEOUT_MS / 1000}s.`)
			}
			if (response) {
				throw new OpenRouterError(`Resposta inválida do OpenRouter (status ${response.status}).`)
			}
			throw new OpenRouterError('Não foi possível conectar ao OpenRouter.')
		}

		if (!response.ok || !data || data.error) {
			throw new OpenRouterError(
				'Falha na requisição ao OpenRouter.',
				data?.error || { message: `OpenRouter respondeu com status ${response.status}.` }
			)
		}

		const content = data.choices?.[0]?.message?.content
		if (!content?.trim()) {
			throw new OpenRouterError('O modelo não retornou nenhuma resposta.')
		}

		return content
	}
}
