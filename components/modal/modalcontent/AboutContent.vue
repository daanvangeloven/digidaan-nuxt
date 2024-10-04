<template>
  <div class="about-content">
    <h1>About me</h1>
    <div class="row">
      <p class="col">
        Hi, my name is <span class="bold">Daan van Geloven</span> and I am a
        <span class="bold">Front-end Developer</span> based in the Netherlands.
      </p>
      <p class="col">
        Currently I'm working as a front-end developer for Jumbo supermarkets. A
        fast paced and dynamic environment where I work with a team to maintain
        an app with over 1.9 million users.
      </p>

      <p class="col">
        I am passionate about using technology to solve problems and am always
        looking for new challenges and opportunities to learn and grow as a
        developer.
      </p>
    </div>
    <hr />
    <h1>My interests</h1>
    <div class="row">
      <div class="col">
        <h2>Golf</h2>
        <img class="interest-img" src="/img/about/golf.png" alt="Golf" />
        Since I first swung a club in september 2022 I have been infatuated with
        the game of golf. <br />
        You can often catch me on the course or practicing away. Competing as
        much as possible and always trying to improve my game.
      </div>
      <div class="col">
        <h2>Interests</h2>
        <img
          class="interest-img"
          src="/img/about/coffee.png"
          alt="Coffee Machine"
        />
        A hobby of mine is perfecting my Espresso abilities. I'm currently
        rocking a Gaggia Classic Pro with tons of upgradres (9 bar springs, VST
        Baskets, Bottomless PF etc...) and a Smart Grinder Pro. I'm also always
        experimenting with different beans from local roasters.
      </div>

      <div class="col">
        <h2>Tinkering</h2>
        <img
          class="interest-img"
          src="/img/about/solder.png"
          alt="Soldering Iron"
        />
        On occasion I love to tinker on small hobby projects. For example
        recently I made a sim racing handbrake from an old potentiometer pedal
        and an arduino nano. Or like the time when my mouse scroll wheel started
        giving occasional wrong inputs so then I wrote new mouse drivers in c++
        with automatic bad scroll input rejection.
      </div>
    </div>
  </div>
</template>

<style>
.bold {
  font-weight: bold;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  overflow-y: scroll;
  font-size: 14px;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;
}
.col {
  display: flex;
  flex-direction: column;
  width: 30%;
}
.interest-img {
  height: 120px;
  widows: 120px;
  display: flex;
  align-self: center;
}

@media (max-width: 768px) {
  .col {
    width: 100%;
  }
}
</style>
