export class SlidePanelsController {

  public showRight: boolean;
  public showLeft: boolean;
  public showNegative: boolean;

  public colourClasses: string[];
  public colourClassesPanels: boolean[];

  constructor () {

    this.showRight = false;
    this.showLeft = false;
    this.showNegative = false;

    this.colourClasses = ['balanced', 'positive', 'negative', 'dark', 'light'];
    this.colourClassesPanels = [];

  }
}
