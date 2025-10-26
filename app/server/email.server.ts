import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const client = new SESv2Client({ region: "us-east-1", profile: "mako" });

export async function sendEmail(message: string) {
	const params = {
		FromEmailAddress: "huguescarlos.soares@gmail.com",
		Destination: {
			ToAddresses: ["huguescarlos.soares@gmail.com"],
		},
		Content: {
			Simple: {
				Subject: {
					Data: "Message",
					Charset: "UTF-8",
				},
				Body: {
					Text: {
						Data: `${message}`,
						Charset: "UTF-8",
					},
					Html: {
						Data: `
						      <!DOCTYPE html>
                  <html>
                    <body>
                      <h1>Message</h1>
                      <p>${message}</p>
                    </body>
                  </html>
                  `,
						Charset: "UTF-8",
					},
				},
			},
		},
	};

	try {
		const command = new SendEmailCommand(params);
		const response = await client.send(command);

		console.log("Message sent successfully!");
		console.log(
			`Server responded with HTTP Status ${response.$metadata.httpStatusCode}`,
		);
	} catch (error) {
		console.log(`Error occured: ${error}`);
		throw error;
	}
}
