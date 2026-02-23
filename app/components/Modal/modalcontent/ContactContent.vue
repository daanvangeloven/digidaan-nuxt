<script setup lang="ts">
const from = ref('');
const subject = ref('');
const body = ref('');
const status = ref('Ready');
const sending = ref(false);
const sent = ref(false);

const TO_EMAIL = 'daan@digidaan.nl';

async function handleSend() {
  sending.value = true;
  status.value = 'Sending...';

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'contact',
        'from': from.value,
        'subject': subject.value,
        'body': body.value,
      }).toString(),
    });

    sent.value = true;
    status.value = 'Message sent successfully.';
  }
  catch {
    status.value = 'Error: Failed to send message. Please try again.';
  }
  finally {
    sending.value = false;
  }
}

const LINKEDIN_URL = 'https://www.linkedin.com/in/daan-van-geloven-644794170/';
</script>

<template>
  <div class="flex flex-col w-full font-w95 text-black bg-w95-gray select-none min-w-[480px]">
    <!-- Mail form -->
    <form
      id="contact-form"
      name="contact"
      data-netlify="true"
      class="flex flex-col flex-1"
      @submit.prevent="handleSend"
    >
      <input
        type="hidden"
        name="form-name"
        value="contact"
      >
      <!-- Header fields -->
      <div class="flex flex-col text-[11px] px-2 py-1.5 gap-1 border-b border-b-w95-dark-gray">
        <div class="flex flex-row items-center gap-2">
          <label
            for="mail-from"
            class="w-14 text-right shrink-0"
          >From:</label>
          <input
            id="mail-from"
            v-model="from"
            type="email"
            name="from"
            required
            autocomplete="email"
            placeholder="your@email.com"
            class="flex-1 bg-white w95-border-inverse px-1 py-0.5 text-[11px] outline-none font-w95"
          >
        </div>

        <div class="flex flex-row items-center gap-2">
          <span
            id="mail-to-label"
            class="w-14 text-right shrink-0"
          >To:</span>
          <div
            aria-labelledby="mail-to-label"
            class="flex-1 bg-w95-gray w95-border-inverse px-1 py-0.5 text-[11px]"
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

        <div class="flex flex-row items-center gap-2">
          <label
            for="mail-subject"
            class="w-14 text-right shrink-0"
          >Subject:</label>
          <input
            id="mail-subject"
            v-model="subject"
            type="text"
            name="subject"
            required
            placeholder="Enter subject..."
            class="flex-1 bg-white w95-border-inverse px-1 py-0.5 text-[11px] outline-none font-w95"
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
        class="flex-1 bg-white w-full resize-none outline-none font-w95 text-[11px] p-2 min-h-[200px] border-none"
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
