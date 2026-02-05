module.exports = function autoTagger(text) {
    const tags = [];
    const lowerText = text.toLowerCase();

    // Location / environment based tags
    if (lowerText.includes("beach")) tags.push("beach");
    if (lowerText.includes("mountain")) tags.push("mountain");
    if (lowerText.includes("city") || lowerText.includes("downtown")) tags.push("city");
    if (lowerText.includes("forest") || lowerText.includes("nature")) tags.push("nature");

    // Stay type / intent based tags
    if (lowerText.includes("wifi")) tags.push("wifi");
    if (lowerText.includes("work") || lowerText.includes("office")) tags.push("workation");
    if (lowerText.includes("quiet") || lowerText.includes("peaceful")) tags.push("peaceful");
    if (lowerText.includes("luxury")) tags.push("luxury");
    if (lowerText.includes("budget") || lowerText.includes("cheap")) tags.push("budget");

    // Traveller type
    if (lowerText.includes("solo")) tags.push("solo-friendly");
    if (lowerText.includes("family")) tags.push("family");
    if (lowerText.includes("couple") || lowerText.includes("romantic")) tags.push("couple");

    // Remove duplicate tags
    return [...new Set(tags)];
};
