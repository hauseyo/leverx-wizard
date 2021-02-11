declare namespace Model {
  declare namespace view {
    interface State {
      currentStep: number;
      isStepLast: boolean;
      obj: { string: string; number: number };
    }
  }
}
