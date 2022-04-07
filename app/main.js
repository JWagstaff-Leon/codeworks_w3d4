import { TripsController } from "./Controllers/TripsController.js";
class App {
  tripsController = new TripsController()
}

window["app"] = new App();
