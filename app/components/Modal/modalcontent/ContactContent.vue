<script setup lang="ts">
const from = ref('');
const subject = ref('');
const body = ref('');
const status = ref('Ready');
const sending = ref(false);
const sent = ref(false);

const TO_EMAIL = 'daan@digidaan.nl';
const WEB3FORMS_KEY = 'b6b320d0-2efa-43d1-9f94-40af7e84fd62';

async function handleSend() {
  sending.value = true;
  status.value = 'Sending...';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        email: from.value,
        subject: subject.value,
        message: body.value,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message ?? 'Submission failed');
    }

    sent.value = true;
    status.value = 'Message sent successfully.';
  }
  catch (err) {
    status.value = err instanceof Error ? `Error: ${err.message}` : 'Error: Failed to send message. Please try again.';
  }
  finally {
    sending.value = false;
  }
}

const LINKEDIN_URL = 'https://www.linkedin.com/in/daan-van-geloven-644794170/';
</script>

<template>
  <div class="flex flex-col w-full font-w95 text-black bg-w95-gray select-none min-w-[480px] max-sm:min-w-0">
    <!-- Mail form -->
    <form
      id="contact-form"
      class="flex flex-col flex-1"
      @submit.prevent="handleSend"
    >
      <!-- Header fields -->
      <div class="flex flex-col text-[11px] px-2 py-1.5 gap-1 border-b border-b-w95-dark-gray max-sm:text-base max-sm:gap-2 max-sm:py-3">
        <div class="flex flex-row items-center gap-2 max-sm:flex-col max-sm:items-start">
          <label
            for="mail-from"
            class="w-14 text-right shrink-0 max-sm:w-auto max-sm:text-left"
          >From:</label>
          <input
            id="mail-from"
            v-model="from"
            type="email"
            name="from"
            required
            autocomplete="email"
            placeholder="your@email.com"
            class="flex-1 bg-white w95-border-inverse px-1 py-0.5 text-[11px] outline-none font-w95 max-sm:text-base max-sm:py-1.5 max-sm:w-full"
          >
        </div>

        <div class="flex flex-row items-center gap-2 max-sm:flex-col max-sm:items-start">
          <span
            id="mail-to-label"
            class="w-14 text-right shrink-0 max-sm:w-auto max-sm:text-left"
          >To:</span>
          <div
            aria-labelledby="mail-to-label"
            class="flex-1 bg-w95-gray w95-border-inverse px-1 py-0.5 text-[11px] max-sm:text-base max-sm:py-1.5 max-sm:w-full"
          >
            <a
              :href="LINKEDIN_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="underline text-w95-blue hover:text-w95-blue cursor-pointer"
            >Daan van Geloven</a>
            <span class="text-w95-dark-gray"> {{ ` <${TO_EMAIL}>` }}</span>
          </div>
        </div>

        <div class="flex flex-row items-center gap-2 max-sm:flex-col max-sm:items-start">
          <label
            for="mail-subject"
            class="w-14 text-right shrink-0 max-sm:w-auto max-sm:text-left"
          >Subject:</label>
          <input
            id="mail-subject"
            v-model="subject"
            type="text"
            name="subject"
            required
            placeholder="Enter subject..."
            class="flex-1 bg-white w95-border-inverse px-1 py-0.5 text-[11px] outline-none font-w95 max-sm:text-base max-sm:py-1.5 max-sm:w-full"
          >
        </div>
      </div>

      <!-- Body -->
      <label
        for="mail-body"
        class="sr-only"
      >Message</label>
      <textarea
        id="mail-body"
        v-model="body"
        name="body"
        required
        placeholder="Write your message here..."
        class="flex-1 bg-white w-full resize-none outline-none font-w95 text-[11px] p-2 min-h-[200px] border-none max-sm:text-base max-sm:min-h-[100px]"
      />

      <!-- Send row -->
      <div class="flex justify-end px-2 py-2 border-t border-t-w95-dark-gray">
        <button
          type="submit"
          :disabled="sent || sending"
          :aria-disabled="sent || sending"
          class="flex flex-row items-center gap-1.5 w95-button-border bg-w95-gray px-3 py-1 cursor-pointer text-[11px] leading-none active:w95-border-inverse disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img
            :src="`${'/img/icons/sendmail.png'}`"
            class="w-4 h-4"
            aria-hidden="true"
            alt=""
          >
          {{ sending ? 'Sending...' : 'Send' }}
        </button>
      </div>
    </form>

    <!-- Status bar -->
    <div class="flex flex-row items-center text-[10px] border-t border-t-w95-dark-gray px-1 py-0.5">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        class="flex-1 w95-border-inverse px-2 py-0.5"
      >
        {{ status }}
      </div>
    </div>
  </div>
</template>
