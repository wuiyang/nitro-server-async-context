declare module "./cloudflare-queue" {
  interface CloudflareQueueNames {
    EMAIL_INVOICE: EmailInvoiceQueueMessage;
  }
  interface CloudflareQueueConsumerNames {
    "email-invoice": EmailInvoiceQueueMessage;
  }
}

export interface EmailInvoiceQueueMessage {
  paymentId: string;
}

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("cloudflare:queue:email-invoice", (queue) => {
    const context = useServerAsyncContext();
    if (context.testing) {
      console.log("able to get context!");
    }
    const paymentMessages = queue.batch.messages;
    console.log("processing paymentMessages", paymentMessages[0].id);
  });
});
