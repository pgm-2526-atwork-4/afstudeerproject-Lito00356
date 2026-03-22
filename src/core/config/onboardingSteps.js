export const ONBOARDING_STEPS = {
  welcome: [
    {
      id: 1,
      title: "Welcome!",
      description:
        "In this area of the webapp you will be able to view your projects as well as load and delete them. You will be able to view pictures you made and send them to your friends and family!",
    },
    {
      id: 2,
      title: "How to get started?",
      description: "If you want to start designing, click 'create a room' to start blueprinting you room!",
      targetSelector: "[data-onboarding='create-room']",
    },
  ],
  collection: [
    {
      id: 1,
      title: "You're back!",
      description: "Now that you have created a room and added some objects, you will see your projects lined up here.",
    },
    {
      id: 2,
      title: "Want to go back designing?",
      description: "You can load one of your projects by pressing 'load'",
      targetSelector: "[data-onboarding='load-project']",
    },
    {
      id: 3,
      title: "Don't like what you made?",
      description: "You can delete the full project by pressing the bin icon on the right side",
      targetSelector: "[data-onboarding='delete-project']",
    },
    {
      id: 4,
      title: "Looking at pictures.",
      description: "If you want to look at pictures you made during your design time, you can view them all here.",
      targetSelector: "[data-onboarding='view-renders']",
    },
    {
      id: 5,
      title: "What about sending them?.",
      description: "If you want to send some pictures to friends and family, just select them and press 'Send email'",
    },
    {
      id: 6,
      title: "What if I don't like them?",
      description: "No worries! You can just select them and press 'Delete', but you will never see them again! :(",
    },
  ],
  blueprint: [
    { id: 1, title: "Blueprinting", description: "You can start drawing your room by pressing on the canvas" },
    {
      id: 2,
      title: "Start wide",
      description: "Start somewhere on the side, so you will have enough space to draw it out.",
    },
    {
      id: 3,
      title: "Walls",
      description:
        "Once you have clicked to set a point, you can drag the mouse to another location to start drawing the line for the first wall.",
    },
    {
      id: 4,
      title: "How many walls?",
      description: "You can draw as many walls as you like. (keep it realistic though)",
    },
    {
      id: 5,
      title: "Close the walls!",
      description:
        "You want to close the walls? Just press the first point you created, this will close the wall and you will not be able to add extra points.",
    },
    {
      id: 6,
      title: "You made a mistake?",
      description: "You can always reset you blueprint or drag one of the points to another location",
    },
    {
      id: 7,
      title: "You like your bluerpint?",
      description:
        "If you like your blueprint, you can press 'Convert to 3D', this will take you to the next step, where you will see your room in 3D!",
      targetSelector: "[data-onboarding='convert-to-3d']",
    },
  ],
  perspective: [
    {
      id: 1,
      title: "You made it this far!",
      description:
        "Welcome to the Perspective view. Here you will be able to see your from all angles and add objects where you like them to be.",
    },
    {
      id: 2,
      title: "Rotate the camera",
      description:
        "If you want to look around the room and rotate the camere, press and hold the left mouse button and then move the mouse left and right. ",
    },
    {
      id: 3,
      title: "Move the camera",
      description:
        "To move the camera, you can click and hold the right mouse button, and then move the mouse left and right ",
    },
    {
      id: 4,
      title: "Zoom in",
      description:
        "To get closer in on the action, you can roll the mouse wheel up. You want to get out of there, roll it back.",
    },
    {
      id: 5,
      title: "Look from above!",
      description:
        "To make it easier, you can press the cube and it will bring you into a topview. From this view it is sometimes easier to mode models around. You can press it again to go back to the perspective view",
      targetSelector: "[data-onboarding='camera-view']",
    },
    {
      id: 6,
      title: "Navigate back to blueprint?",
      description:
        "Let's say you need to change your design a bit? Great, you can press the blueprint badge. This will bring you right back.",
      targetSelector: "[data-onboarding='title-badge']",
    },
    {
      id: 7,
      title: "Want to see your projects?",
      description:
        "You want to see your projects? You can press the profile button, and press collection. You can also logout here.",
      targetSelector: "[data-onboarding='menu-profile']",
    },
    {
      id: 8,
      title: "Add your first object",
      description:
        "If you press the furniture icon, you can select category from the list. From that category you will be able to select an object. This wil apear in the scene.",
      targetSelector: "[data-onboarding='menu-furniture']",
    },
    {
      id: 9,
      title: "Only furniture?",
      description: "No, you can find doors as well as windows in this list.",
      targetSelector: "[data-onboarding='menu-furniture']",
    },
    {
      id: 10,
      title: "Color the concrete?",
      description: "You can also add a texture / color to the walls and floor! But don't forget to confirm you selection.",
      targetSelector: "[data-onboarding='menu-materials']",
    },
  ],
  MovingObjects: [
    {
      id: 1,
      title: "Move an object",
      description:
        "So you have created an object and want to move it? You select the object by clicking on it. You will see colored arrows appear, you can move the object by clicking and dragging one of the arrows, or the litle square in between them.",
    },
    {
      id: 2,
      title: "Happy with you move?",
      description:
        "If you are happy with your transform of the object, you can press the checkmark above it. This will freeze it in the new position. Or press the red cross if you want to reset the position.",
    },
    {
      id: 3,
      title: "Rotation?",
      description:
        "You can also rotate the object, by pressing 'R' on the keyboard. This wil spawn colored circles, to rotate the object, click and drag one of the circles.",
    },
    {
      id: 4,
      title: "Reset Rotation?",
      description: "If you went a bit funky on the rotation, you can press reset rotation in the bottom left corner.",
      targetSelector: "[data-onboarding='object-options']",
    },
    {
      id: 5,
      title: "Keys to remember",
      description: "You can go back to moving the object by pressing 'W' on the keyboard. Rotation is 'R'.",
    },
  ],
  Lighting: [
    {
      id: 1,
      title: "Lights!",
      description:
        "You can also illuminate your scene more by adding a sky or even a 360 image (hdri) to your scene. This will make it more dynamic!",
      targetSelector: "[data-onboarding='menu-lighting']",
    },
  ],
  Saving: [
    {
      id: 1,
      title: "Lights, camera and Snapshot!",
      description:
        "If you want to make snapshots in from your room that you can send afterwards, you can press this the camera icon. Make sure you correctly position the camera first. This will trigger a snapshot effect and will save an image to your collection folder",
      targetSelector: "[data-onboarding='menu-render']",
    },
    {
      id: 2,
      title: "Done",
      description:
        "When you are all set and done, happy with your scene. You can save the scene by clicking the 'Floppy disk' icon. This will save the scene and you will be able to come back to this any time.",
      targetSelector: "[data-onboarding='menu-save']",
    },
    {
      id: 3,
      title: "Not sure how to do it?",
      description:
        "Don't remember something? You can always come back to this tutorial once you have walked through it all and freshen up things you've forgotten.",
      targetSelector: "[data-onboarding='tutorial-btn']",
    },
  ],
};
