function showSection(sectionId) {
    let sections = document.querySelectorAll("section");
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
}

function simulateAI() {
    let input = document.getElementById("promptInput").value;
    let output = document.getElementById("output");

    if(input.trim() === "") {
        output.innerHTML = "Please enter a prompt.";
        return;
    }

    output.innerHTML = "AI Response: This is a sample generated answer for your prompt: <b>" 
                        + input + "</b><br><br>Always verify AI-generated content.";
}
