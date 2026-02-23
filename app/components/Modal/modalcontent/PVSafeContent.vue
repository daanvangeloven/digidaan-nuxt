<template>
  <div class="p-5 mb-5 flex flex-col gap-5 overflow-y-auto max-w-[70vw] max-h-[70vh] max-md:max-w-full max-sm:max-h-none">
    <h1 class="text-2xl font-bold">
      PVSafe
    </h1>

    <p class="text-xs">
      For PVSafe I have developed 3 coherent systems. These 3 systems together
      ensure that the PVSafe appointments can be planned and executed quickly
      and efficiently. Everything is digitally controlled from start to finish.
    </p>
    <p class="text-xs">
      Together with the client we decided to use an open voucher system.
      Customers buy a voucher code via the website, which can be used later to
      schedule an appointment. The customer buys a voucher on the website, then
      the customer makes an appointment through the 'My PVSafe' system. A PVSafe
      employee then carries out the appointment via the PVSafe Admin Dashboard.
    </p>

    <h2 class="text-xl font-bold">
      PVSafe Website
    </h2>

    <img
      src="/img/projects/pvsafe/pvsafe-homepage.png"
      alt="PVSafe homepage"
      class="flex self-center w-[90%] h-auto max-md:w-full"
    >

    <p class="text-xs">
      The PVSafe website is made with <span class="font-bold">wordpress</span>. I had
      chosen this because the website itself needed no more than some basic
      pages with information. Think of a landing page, contact form, 'about us'
      and a checkout page for the vouchers.
    </p>

    <p class="text-xs">
      The theme used is <span class="font-bold">Astra</span> in combination with
      <span class="font-bold">WooCommerce</span>. WooCommerce takes care of the
      payments of the vouchers and once payment is complete, a webhook is sent
      to the PVSafe API. This webhook ensures that the vouchers are created in
      the database and sent to the customer via e-mail.
    </p>

    <h2 class="text-xl font-bold">
      My PVSafe
    </h2>

    <img
      src="/img/projects/pvsafe/mijn-pvsafe.png"
      alt="My PVSafe"
      class="flex self-center w-[90%] h-auto max-md:w-full"
    >
    <p class="text-xs">
      My PVSafe is developed with <span class="font-bold">ASP.NET Core MVC</span>.
    </p>

    <h3 class="text-base font-bold">
      Frontend
    </h3>
    <p class="text-xs">
      The front-end styling for 'My PVSafe' is done with
      <span class="font-bold">Tailwind CSS</span>. Tailwind is a front-end CSS
      framework that makes it faster to develop. By using Tailwind you don't
      have to write your own CSS classes.
    </p>

    <h3 class="text-base font-bold">
      Authentication
    </h3>
    <p class="text-xs">
      The authentication for My PVSafe is done with a custom email verification
      process. Upon user entry, the user receives an email with a magic login
      link. When they click on this link, they are automatically logged in and
      redirected to the application.
    </p>

    <h3 class="text-base font-bold">
      Data
    </h3>

    <p class="text-xs">
      The data of PVSafe is stored in a
      <span class="font-bold">MySQL Database</span>. The communication with this
      database is done via <span class="font-bold">Entity Framework</span>. I had
      chosen for a <span class="font-bold">model-first implementation</span>. The
      database tables are generated from the models in the PVSafe
      <span class="font-bold">ASP.NET Project</span>. This ensures perfect
      integration between the database and
      <span class="font-bold">Entity Framework</span>.
    </p>
  </div>
</template>
