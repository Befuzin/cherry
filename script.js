const input = document.getElementById("input");
const output = document.getElementById("output");

const commands = {
  help: "Available commands:\nlogs, alleys, symbols, community, audio, exit",
  alleys: "Some streets in Old Japantown don't behave like streets. The walls remember.",
  logs: "Log 14: Footsteps echo in empty alleys. Neon signs blink strangely.",
  symbols: `
   +-----------------------+
   |  △   ○   ×   ⬟   □   |
   |  □   △   △   ⬟   ○   |
   |  ×   ⬟   □   △   ×   |
   |  ○   ×   △   ○   ⬟   |
   |  △   ⬟   ×   □   △   |
   +-----------------------+
  `,
  community: "Community Notes: lost pets, street poems, flyers. Some entries repeat across time.",
  audio: "Audio logs: voices_floor_13.mp3, rain_static.mp3 (clickable links can be added later)",
  exit: "Disconnecting... see you soon."
};

input.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    const command = input.value.trim();
    if(commands[command]){
      output.textContent += `\n> ${command}\n${commands[command]}`;
    } else {
      output.textContent += `\n> ${command}\nUnknown command. Type 'help' for a list.`;
    }
    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});
