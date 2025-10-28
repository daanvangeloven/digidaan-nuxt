<template>
  <div class="summa-content">
    <h1>Summa College - Fitting Education Cardgame</h1>
    <p>
      For the Summa college I digitized an existing card game. Originally, this
      project was a study project for my education at Summa College, but the
      clients were so enthusiastic that I eventually developed a complete
      realization through my company.
    </p>

    <h2>The Physical Cardgame</h2>
    <p>
      The card game was originally developed by employees of Summa College. The
      aim of the game is to support students with learning troubles. The Card
      Game makes it easy for students to identify their obstacles and find a
      suitable solution.
    </p>
    <p>
      Normally it takes a lot of time to run the deck. There are 3 card
      categories: Impediments(What is the impediment), Solutions(How do I solve
      this impediment), Executors(Who is implementing this solution). More than
      50 Impediments and solutions are incorporated in the game. So it takes a
      lot of time to go through all the cards.
    </p>

    <h2>The Digital Cardgame</h2>
    <h3>Step 1. Authentication</h3>
    <img src="/img/projects/summa/kaartspel-login.png" alt="login screen" />
    <p>
      The Summa College also sells the rights of the card game to other
      agencies. It must therefore be possible for other agencies to gain access
      as well. To realize this I have devised a simple e-mail system. The home
      page of the application has an input field for a school email. The email
      domain is a dropdown field. Other schools can add their domain to this and
      that way only allowed domains can use the application.
    </p>

    <h3>Step 2. Identify Impediments</h3>
    <img src="/img/projects/summa/belemmeringen.png" alt="impediments screen" />
    <p>
      The students get to see each impediment once. They can indicate whether or
      not this impediment applies. If an impediment roughly fits but not quite,
      the student can explain this on the same page.
    </p>

    <h3>Step 3. Solution Coupling</h3>
    <img src="/img/projects/summa/oplossing-1.png" alt="impediments screen" />
    <p>
      After the impediments have been determined, the students can identify
      possible solutions. The card game contains many solutions and not all of
      them apply to every impediment. So a lot of time was lost looking at
      unnecessary cards.
    </p>
    <p>
      To solve this, I made the system smarter. By analyzing the previous users'
      input, I constantly trained the system, making it faster and more
      efficient for the students to perform the card game.
    </p>
    <p>
      As you can see in the image above, solutions that are often used for a
      specific obstacle are placed at the top. The further down you go, the less
      relevant the solutions become.
    </p>
    <img src="/img/projects/summa/oplossing-2.png" alt="impediments screen 2" />

    <h3>Step 4. Couple Executors</h3>
    <img src="/img/projects/summa/uitvoerders.png" alt="executors screen" />
    <p>
      As a final step, the executors are linked to the solutions. This is a
      similiar method as the solutions. The cards are sorted by relevance and
      when students often choose certain cards, they will be placed higher and
      higher.
    </p>

    <h3>Step 5. Results</h3>
    <p>
      Finally, all cards are placed in a table. The student can then print this
      table. With the printed page, the student goes to his tutor to discuss the
      results.
    </p>
  </div>
</template>

<style lang="scss">
.summa-content {
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
  max-width: 70vw;
  max-height: 70vh;
  overflow-y: auto;

  img {
    display: flex;
    align-self: center;
    width: 80%;
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
@media (max-width: 768px) {
  .summa-content {
    max-width: 100%;
  }
  .summa-content img {
    width: 100%;
  }
}
</style>
