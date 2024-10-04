<template>
  <div class="pvsafe-content">
    <h1>PVSafe</h1>

    <p>
      For PVSafe I have developed 3 coherent systems. These 3 systems together
      ensure that the PVSafe appointments can be planned and executed quickly
      and efficiently. Everything is digitally controlled from start to finish.
    </p>
    <p>
      Together with the client we decided to use an open voucher system.
      Customers buy a voucher code via the website, which can be used later to
      schedule an appointment. The customer buys a voucher on the website, then
      the customer makes an appointment through the ‘My PVSafe’ system. A PVSafe
      employee then carries out the appointment via the PVSafe Admin Dashboard.
    </p>

    <h2>PVSafe Website</h2>

    <img src="/img/projects/pvsafe/pvsafe-homepage.png" alt="PVSafe homepage" />

    <p>
      The PVSafe website is made with <span class="bold">wordpress</span>. I had
      chosen this because the website itself needed no more than some basic
      pages with information. Think of a landing page, contact form, ‘about us’
      and a checkout page for the vouchers.
    </p>

    <p>
      The theme used is <span class="bold">Astra</span> in combination with
      <span class="bold">WooCommerce</span>. WooCommerce takes care of the
      payments of the vouchers and once payment is complete, a webhook is sent
      to the PVSafe API. This webhook ensures that the vouchers are created in
      the database and sent to the customer via e-mail.
    </p>

    <h2>My PVSafe</h2>

    <img src="/img/projects/pvsafe/mijn-pvsafe.png" alt="My PVSafe" />
    <p>
      My PVSafe is developed with <span class="bold">ASP.NET Core MVC</span>.
    </p>

    <h3>Frontend</h3>
    <p>
      The front-end styling for ‘My PVSafe’ is done with
      <span class="bold">Tailwind CSS</span>. Tailwind is a front-end CSS
      framework that makes it faster to develop. By using Tailwind you don’t
      have to write your own CSS classes.
    </p>

    <h3>Authentication</h3>
    <p>
      The authentication for My PVSafe is done with a custom email verification
      process. Upon user entry, the user receives an email with a magic login
      link. When they click on this link, they are automatically logged in and
      redirected to the application.
    </p>

    <h3>Data</h3>

    <p>
      The data of PVSafe is stored in a
      <span class="bold">MySQL Database</span>. The communication with this
      database is done via <span class="bold">Entity Framework</span>. I had
      chosen for a <span class="bold">model-first implementation</span>. The
      database tables are generated from the models in the PVSafe
      <span class="bold">ASP.NET Project</span>. This ensures perfect
      integration between the database and
      <span class="bold">Entity Framework</span>.
    </p>
  </div>
</template>

<style lang="scss">
.pvsafe-content {
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
  max-width: 70vw;
  max-height: 70vh;

  img {
    display: flex;
    align-self: center;
    width: 90%;
    height: auto;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
  }
}

.bold {
  font-weight: bold;
}

@media (max-width: 768px) {
  .pvsafe-content {
    max-width: 100%;
  }
  .pvsafe-content img {
    width: 100%;
  }
}
</style>
