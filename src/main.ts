import * as dat from "dat-gui";
import Boss, {
  AimPlayerBullerDrop,
  AimPlayerMultipleBullet,
  RandomBulletDrop,
  RandomBulletSpread,
  SumonFormation,
} from "./Boss";
import ctx, {celm, scrheight, scrwidth} from "./canvas";
import EnemyFormation, {
  PolygonEPP,
  PyramidEPP,
  RandomPositionSPP,
  StraightForwardSPP,
  StraightLineEPP,
  TowardPlayerSPP,
  WallEPP,
} from "./EnemyFormation";
import {emit, Events} from "./EventListener";
import FinalBoss, {LazerChase, LazerScan, RadialLazerScan} from "./FinalBoss";
import {gameloop, setPlayer} from "./game";
import {images, ImagesId, onload} from "./imageLoader";
import "./loadImages";
import Moon, {MoonState} from "./Moon";
import Planet from "./Planet";
import Player from "./Player";
import StarField from "./StarField";
import "./UI";

// tslint:disable no-shadowed-variable
onload(() => {
  celm.width = scrwidth;
  celm.height = scrheight;
  // tslint:disable no-unused-expression
  // Its actually used expression, tslint does not recognize that
  setPlayer(new Player());
  function rep<T>(obj: T, n: number) {
    const ans: T[] = [];
    for (; n--; ) {
      ans.push(obj);
    }
    return ans;
  }
  // const u = [];
  // for (let i = 1; i--; ) {
  //   u.push({
  //     bulletConfig: {
  //       color: "red",
  //       radius: 6,
  //       speed: 500,
  //     },
  //     hitImage: images[ImagesId.BigHFOHit],
  //     image: images[ImagesId.BigUFO + i],
  //     live: 1000,
  //   });
  // }
  // const x = new EnemyFormation(
  //   u,
  //   new RandomPositionSPP(),
  //   new PolygonEPP(300),
  // );

  new StarField(100, 50);
  new StarField(100, 65);
  new StarField(100, 80);
  new FinalBoss({
      bulletConfig: {
        color: "lawngreen",
        radius: 6,
        speed: 800,
      },
      fireTimeRange: [.1, .2],
      // hitImage: images[ImagesId.BigHFOHit],
      image: images[ImagesId.alienPlanetSurfaceWithShield],
      live: 1000,
    },
    [
      // new RandomBulletDrop(),
      // new AimPlayerBullerDrop(),
      // new AimPlayerMultipleBullet(),
      // new RandomBulletSpread(5),
      new LazerChase(),
      new LazerChase(3),
      new LazerScan(),
      new LazerScan(2, 2.5, 1.5),
      new RadialLazerScan(),
      new RadialLazerScan(3, 1),
      // new SumonFormation(() => [new EnemyFormation(
      //   [{
      //     bulletConfig: {
      //       color: "red",
      //       radius: 6,
      //       speed: 500,
      //     },
      //     image: images[ImagesId.UFO],
      //     live: 5,
      //   }],
      //   new RandomPositionSPP(),
      //   new PolygonEPP(),
      // )], 3),
    ],
    .75,
  );

  gameloop();
});
