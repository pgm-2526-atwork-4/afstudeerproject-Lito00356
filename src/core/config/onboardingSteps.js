export const ONBOARDING_STEPS = {
  welcome: [
    {
      id: 1,
      title: "Welcome!",
      description: "Here you will be able to design you own room. Click create a room to get started!",
    },
  ],
  blueprint: [
    {
      id: 1,
      title: "Draw you room",
      description: "Click on the canvas to start drawing. After that select another point on the canvas.",
    },
    { id: 2, title: "Close the room", description: "If you want to close the room, you can click on the first point." },
    {
      id: 3,
      title: "Convert to 3D",
      description:
        "Once your done, and you are happy with your room, you can click 'convert to 3D' and you will go to the next step.",
    },
  ],
  perspective: [
    { id: 1, title: "Add furniture", description: "Click the menu on the right side, to add furniture." },
    { id: 2, title: "Move furniture", description: "If you want to move a object, you can select it by pressing on it." },
    { id: 3, title: "Save", description: "Click 'Save icon' to save the scene. This way you can continue next time." },
  ],
};
