const fs = require("node:fs");
const path = require("node:path");

const site = "https://unboring.openagent.bot";
const assetVersion = "20260601b";
const lastmod = "2026-06-01";
const socialImage = `${site}/og-image.svg`;

const categories = [
  {
    slug: "motion",
    title: "Motion",
    nav: "Motion",
    eyebrow: "Product-grade movement, not portfolio animation.",
    description:
      "Restrained UI motion patterns for AI-generated interfaces. Browse the idea first, then open details for prompts, negative prompts, and tokens.",
    accent: "06 originals expanded to 20",
  },
  {
    slug: "components",
    title: "Components",
    nav: "Components",
    eyebrow: "Components need taste too.",
    description:
      "A shadcn-style open component directory with anatomy, variants, states, accessibility notes, implementation guidance, AI prompts, and tokens.",
    accent: "40 registry-ready components",
  },
  {
    slug: "interactions",
    title: "Interactions",
    nav: "Interactions",
    eyebrow: "Tiny moments. Real product feel.",
    description:
      "Small response moments for copy states, empty states, command feedback, focus changes, and progressive disclosure.",
    accent: "20 interaction states",
  },
  {
    slug: "styles",
    title: "Styles",
    nav: "Styles",
    eyebrow: "Style recipes that can be described.",
    description:
      "Concise visual directions, constraints, and anti-prompts that help AI tools avoid generic SaaS mush.",
    accent: "20 visual recipes",
  },
  {
    slug: "effects",
    title: "Effects",
    nav: "Effects",
    eyebrow: "Light, particle, glow.",
    description:
      "Visual effects that add polish and delight. Beams, particles, meteors, confetti, border animations, and hover-driven light effects.",
    accent: "16 effects",
  },
];

const rawEntries = {
  motion: [
    ["Calm Staggered Fade Up", "Reveal grouped content with a quiet, structured rhythm.", "cards", "calm", "on page load or scroll into view"],
    ["Soft Hover Lift", "Make clickable cards feel tactile without becoming flashy.", "card", "tactile", "hover"],
    ["Snappy Button Press", "Give commands immediate physical feedback.", "button", "snappy", "pointer down"],
    ["Command Menu Reveal", "Open command surfaces with fast, centered focus.", "command", "focused", "open command menu"],
    ["Accordion Expand", "Reveal hidden content without a jarring layout jump.", "accordion", "clear", "click accordion header"],
    ["Toast Slide In", "Show feedback without interrupting the main task.", "toast", "lightweight", "show notification"],
    ["Inline Save Pulse", "Confirm saving with a tiny local state change.", "pulse", "reassuring", "save complete"],
    ["Panel Crossfade", "Swap utility panels without making the layout feel busy.", "panel", "quiet", "panel change"],
    ["Focus Ring Draw", "Bring attention to a focused field with a restrained outline.", "focus", "precise", "focus input"],
    ["Stepper Advance", "Move between steps with a short directional cue.", "steps", "progressive", "next step"],
    ["Skeleton Settle", "Turn placeholders into content without a hard swap.", "list", "stable", "data loaded"],
    ["Drawer Slide", "Reveal a side drawer from nearby screen context.", "drawer", "grounded", "open drawer"],
    ["Tab Underline Glide", "Move active tab state with a crisp underline.", "tabs", "crisp", "change tab"],
    ["Modal Scale In", "Open modal content with a tiny centered scale.", "panel", "contained", "open modal"],
    ["Menu Item Trail", "Reveal menu rows in a tight sequence.", "command", "organized", "open menu"],
    ["Number Count Nudge", "Update a metric with a small vertical tick.", "metric", "informative", "value change"],
    ["Empty State Fade", "Introduce empty-state guidance without theatrics.", "card", "soft", "empty result"],
    ["Filter Chip Shift", "Move active filters into place without layout shock.", "chips", "tidy", "filter applied"],
    ["Progress Bar Ease", "Advance progress with an honest, steady fill.", "progress", "steady", "task progress"],
    ["Tooltip Pop", "Show short help with a fast fade and tiny lift.", "tooltip", "helpful", "hover help"],
    ["Marquee", "Scroll content continuously in a horizontal or vertical stream.", "marquee", "flowing", "on load"],
    ["Blur Fade", "Fade elements in with a soft blur-to-sharp transition.", "blur-fade", "soft", "on load or scroll"],
    ["Animated List", "Reveal list items with staggered entrance animations.", "list", "organized", "items added"],
    ["Scroll Reveal", "Fade and translate elements into view as the user scrolls, with scrub for direct scroll-to-animation mapping.", "scroll-reveal", "revealing", "scroll into view"],
    ["Parallax Scroll", "Move layers at different scroll speeds to create depth and immersion.", "parallax-scroll", "layered", "scroll"],
    ["Pin Section", "Pin a section in place while content animates behind or in front of it.", "pin-section", "dramatic", "scroll into pin zone"],
    ["Char Reveal", "Reveal text character by character with staggered entrance for a refined editorial feel.", "char-reveal", "refined", "on load or scroll into view"],
    ["Word Slide Up", "Slide words up with a clip reveal for clean, editorial text entrance.", "word-slide", "editorial", "scroll into view"],
    ["Line Reveal", "Reveal lines of text sequentially with a smooth wipe transition.", "line-reveal", "clean", "scroll into view"],
    ["SVG Path Draw", "Draw SVG paths progressively for a hand-crafted reveal effect.", "svg-draw", "precise", "on load or scroll into view"],
    ["Shape Morph", "Morph one shape smoothly into another with interpolated path transitions.", "shape-morph", "fluid", "toggle or click"],
    ["Layout Transition", "Animate elements smoothly between layout states for seamless reflow.", "layout-morph", "seamless", "layout change"],
    ["Timeline Sequence", "Orchestrate a precise multi-step animation sequence with controlled timing.", "timeline-seq", "orchestrated", "on load"],
    ["Magnetic Hover", "Attract an element toward the cursor with a magnetic pull effect on hover.", "magnetic", "tactile", "hover"],
    ["Motion Path", "Animate an element along a custom curved path for guided movement.", "motion-path", "guided", "on load or trigger"],
  ],
  interactions: [
    ["Copy Confirmation", "Confirm copy without interrupting the workflow.", "toast", "quick", "copy"],
    ["Undo Bar", "Offer a short undo path after a destructive action.", "toast", "safe", "delete"],
    ["Optimistic Save", "Show a local saved state before background sync settles.", "pulse", "confident", "save"],
    ["Inline Validation", "Explain a form problem beside the field.", "focus", "specific", "invalid input"],
    ["Command Loading State", "Keep a command surface useful while work runs.", "command", "busy", "run command"],
    ["Drag Reorder Cue", "Show where an item will land while dragging.", "list", "spatial", "drag"],
    ["Selection Count Bar", "Reveal batch actions only when selection exists.", "panel", "contextual", "select rows"],
    ["Hover Intent Menu", "Expose secondary actions after a deliberate hover.", "command", "restrained", "hover"],
    ["AI Thinking Dots", "Indicate work without pretending to be magic.", "pulse", "honest", "generate"],
    ["Streaming Text Reveal", "Show generated text arriving in readable chunks.", "list", "alive", "stream text"],
    ["Inline Rename", "Turn a label into an editable field in place.", "search", "direct", "rename"],
    ["Multi-select Tokens", "Turn chosen values into tidy removable chips.", "chips", "organized", "select option"],
    ["Permission Prompt", "Ask for access with a compact, contextual panel.", "panel", "respectful", "request access"],
    ["Background Task Toast", "Report async completion without stealing focus.", "toast", "non-interruptive", "task complete"],
    ["Keyboard Focus Jump", "Move focus between command areas predictably.", "focus", "accessible", "keyboard nav"],
    ["Filter Applied State", "Make active filters visible without clutter.", "chips", "tidy", "filter"],
    ["Error Recovery Row", "Attach recovery action to the failed item.", "table", "practical", "error"],
    ["Inline Diff Reveal", "Show before and after changes in place.", "split", "transparent", "compare"],
    ["Autosuggest List", "Offer suggestions below a field with calm priority.", "command", "assistive", "type"],
    ["Progressive Disclosure", "Reveal advanced settings only when needed.", "accordion", "lightweight", "expand"],
    ["Interactive Hover Button", "A button whose gradient or glow follows the mouse cursor.", "button", "engaging", "hover"],
    ["Shimmer Button", "A button with a traveling shimmer light effect.", "button", "premium", "hover"],
    ["Ripple Button", "A button that spawns expanding ripple circles on click.", "button", "tactile", "click"],
    ["Pulsating Button", "A button with a subtle pulsing glow to draw attention.", "button", "urgent", "continuous"],
    ["Swipe to Dismiss", "Swipe a card sideways to reveal a delete or archive action.", "swipe-dismiss", "decisive", "swipe gesture"],
    ["Pull to Refresh", "Pull down a list to trigger a content refresh.", "pull-refresh", "responsive", "pull gesture"],
    ["Long Press Menu", "Hold an item to reveal a contextual action menu.", "long-press", "revealing", "long press"],
    ["Drag Handle", "A grip icon that signals drag-to-reorder capability.", "drag-handle", "affordable", "grab"],
    ["Infinite Scroll", "Load more content seamlessly as the user scrolls down.", "infinite-scroll", "continuous", "scroll to bottom"],
    ["Scroll Progress", "A thin bar that fills as the user scrolls through content.", "scroll-progress", "informative", "scroll"],
    ["Scroll Snap", "Snap sections into place for a paginated scroll experience.", "scroll-snap", "structured", "scroll"],
    ["Sticky Header", "Pin navigation to the top as the user scrolls past it.", "sticky-header", "persistent", "scroll past"],
    ["Back to Top", "A floating button that scrolls the page back to the top.", "back-to-top", "convenient", "scroll down"],
    ["Inline Field Validation", "Show success or error state beside a form field in real time.", "field-validation", "immediate", "input change"],
    ["Character Counter", "Show remaining characters as the user types.", "char-counter", "constrained", "typing"],
    ["Password Strength", "Indicate password strength with a color-coded meter.", "password-strength", "secure", "typing"],
    ["Multi-step Indicator", "Show progress through a multi-step form or wizard.", "multi-step", "guided", "step change"],
    ["Autocomplete Dropdown", "Show filtered suggestions below an input as the user types.", "autocomplete", "assistive", "typing"],
    ["Optimistic Toggle", "Toggle a setting immediately while sync happens in background.", "optimistic-toggle", "instant", "toggle"],
    ["Error with Retry", "Show an error message with a one-tap retry action.", "error-retry", "recoverable", "error"],
    ["Success Checkmark", "Flash a checkmark to confirm a completed action.", "success-check", "satisfying", "action complete"],
    ["Loading Skeleton Pulse", "Show placeholder shapes that pulse while content loads.", "skeleton-pulse", "expectant", "loading"],
    ["Context Menu", "A floating menu that appears on right-click or long-press.", "context-menu", "situational", "right click"],
    ["Toast Stacking", "Stack multiple toast notifications with staggered positioning.", "toast-stack", "ordered", "multiple events"],
    ["Sticky Footer Action", "Pin a primary action to the bottom of the viewport.", "sticky-footer", "persistent", "scroll"],
    ["Animated Beam", "A light beam that travels along a path between two points.", "animated-beam", "connected", "continuous"],
    ["Border Beam", "An animated beam of light that traces the border of an element.", "border-beam", "polished", "continuous"],
    ["Shine Border", "A rotating shine that sweeps around element borders.", "shine-border", "premium", "continuous"],
    ["Glare Hover", "A glare light effect that follows the cursor across a surface.", "glare-hover", "interactive", "mouse move"],
    ["Spotlight Card", "A card whose border glows following the mouse position.", "spotlight-card", "interactive", "mouse move"],
    ["Magic Card", "A card with a subtle animated gradient border glow.", "magic-card", "enchanted", "continuous"],
    ["Glow Effect", "Elements that emit a soft pulsing glow aura.", "glow-effect", "radiant", "continuous"],
    ["Smooth Cursor", "A custom cursor that follows mouse movement with smooth easing.", "smooth-cursor", "refined", "mouse move"],
    ["Magnetic Button", "A button that slightly attracts toward the cursor on hover.", "magnetic-button", "attractive", "hover"],
    ["Morphing Button", "A button that smoothly morphs its shape on interaction.", "morphing-button", "fluid", "click"],
    ["Tool Call Status", "Show the status of an AI tool call with clear feedback.", "tool-call-status", "transparent", "tool call"],
    ["Agent Thinking", "Indicate an AI agent is processing with a sophisticated animation.", "agent-thinking", "patient", "generate"],
    ["Streaming Text", "Display AI-generated text arriving in readable chunks.", "streaming-text", "alive", "stream"],
    ["Context Attachment", "Attach context files or notes to an AI prompt.", "context-attachment", "organized", "add context"],
    ["Model Selector", "Choose between different AI models with a compact selector.", "model-selector", "flexible", "select model"],
    ["Token Counter", "Show token usage with a visual indicator.", "token-counter", "informative", "typing"],
    ["Prompt History", "Browse previous prompts with a scrollable list.", "prompt-history", "accessible", "browse"],
    ["Output Diff", "Show before and after changes in AI-generated content.", "output-diff", "transparent", "compare"],
    ["Prompt Receipt", "A generated-output summary that feels like a receipt.", "receipt", "trustworthy", "generation complete"],
    ["Decision Dial", "Choose between tradeoffs rather than toggling a setting.", "knobs", "expressive", "adjust choice"],
    ["Constraint Board", "Shape outputs by moving constraints instead of writing more text.", "board", "hands-on", "edit constraints"],
    ["Command Workbench", "A dense area for prompt, context, tools, and output.", "composer", "capable", "compose"],
    ["Compare Canvas", "Place versions side by side for fast judgment.", "split", "comparative", "compare"],
    ["Inspector Rail", "A slim rail for selected-object metadata.", "drawer", "focused", "inspect"],
    ["Recipe Sheet", "A structured surface for reusable prompt recipes.", "receipt", "repeatable", "save recipe"],
    ["Agent Run Log", "A readable timeline for autonomous work.", "timeline", "auditable", "agent run"],
    ["Context Shelf", "A shelf for files, notes, and constraints feeding an AI task.", "list", "organized", "add context"],
    ["Output Stack", "Layer multiple generated results without chat clutter.", "cards", "browseable", "generate variants"],
    ["Review Queue", "A triage surface for accepting, editing, or rejecting outputs.", "table", "decisive", "review"],
    ["Prompt Lab", "A compact lab for testing prompt variations.", "panel", "experimental", "test prompt"],
    ["Source Binder", "A surface for citations, uploads, and evidence.", "list", "grounded", "add source"],
    ["Tool Belt", "A horizontal set of contextual utility actions.", "chips", "handy", "choose tool"],
    ["Brief Builder", "A guided canvas for product/design briefs.", "steps", "structured", "build brief"],
    ["Memory Panel", "A place to view and edit persistent AI memory.", "panel", "careful", "edit memory"],
    ["Variant Gallery", "A compact gallery for generated alternatives.", "cards", "selective", "choose variant"],
    ["Approval Sheet", "A lightweight surface for signoff decisions.", "receipt", "accountable", "approve"],
    ["Data Mapping Board", "A visual mapping between fields and outputs.", "board", "systematic", "map data"],
    ["Launch Checklist", "A practical surface for final review before ship.", "steps", "ready", "complete checklist"],
    ["Terminal", "A command-line terminal interface for developer-facing AI tools.", "terminal", "technical", "command input"],
    ["Dock", "A macOS-style dock bar for quick-access app launching.", "dock", "focused", "hover"],
  ],
  styles: [
    ["Editorial Utility", "Dense app layouts with quieter typography and strong hierarchy.", "style", "editorial", "style page"],
    ["Mono Workbench", "Developer surfaces that feel technical without terminal cosplay.", "code", "technical", "style page"],
    ["Warm Minimal", "Neutral product screens with soft contrast and precise spacing.", "style", "warm", "style page"],
    ["Sharp Monochrome", "Black, white, and gray layouts with clear weight shifts.", "style", "sharp", "style page"],
    ["Quiet Dashboard", "Operational UI that favors scanning over decoration.", "table", "calm", "style page"],
    ["Document Native", "Interfaces that borrow restraint from docs and notes.", "receipt", "plain", "style page"],
    ["Command Line Soft", "Command-heavy UI without harsh terminal aesthetics.", "command", "focused", "style page"],
    ["Studio Panel", "Creative tools with tidy controls and generous canvas space.", "panel", "crafted", "style page"],
    ["Minimal Data Room", "Data-heavy pages with subdued borders and strong grouping.", "table", "serious", "style page"],
    ["AI Research Desk", "A reading and synthesis style for research workflows.", "split", "thoughtful", "style page"],
    ["Product OS", "A crisp internal-tool style for repeated daily work.", "drawer", "productive", "style page"],
    ["Notebook Console", "A hybrid of note-taking and command execution.", "composer", "reflective", "style page"],
    ["Luxury Sparse", "High-end whitespace with restrained contrast.", "style", "premium", "style page"],
    ["Dense Minimal", "Compact UI that still feels considered.", "table", "efficient", "style page"],
    ["Soft Brutalist", "Hard edges softened by neutral tone and spacing.", "board", "direct", "style page"],
    ["Local-first Calm", "Offline-capable product UI with reassuring states.", "pulse", "stable", "style page"],
    ["Review Mode", "A style for careful approvals, comments, and diffs.", "split", "careful", "style page"],
    ["Knowledge Base", "Documentation surfaces with app-like navigation.", "list", "clear", "style page"],
    ["Agent Console", "A transparent style for autonomous AI runs.", "timeline", "auditable", "style page"],
    ["Premium Settings", "Settings pages that feel precise, not generic.", "toggle", "polished", "style page"],
    ["Neon Gradient", "Vibrant neon gradients with soft glow for accent elements.", "neon-gradient", "electric", "style page"],
    ["Glassmorphism", "Frosted-glass panels with backdrop blur and transparency.", "glassmorphism", "modern", "style page"],
    ["Gradient Mesh", "Organic mesh gradients that blend multiple color points.", "gradient-mesh", "lively", "style page"],
    ["Aurora Borealis", "Shifting aurora gradients for immersive and ethereal interfaces.", "aurora-borealis", "ethereal", "style page"],
    ["Cyberpunk", "Neon accents and glitch effects for futuristic interfaces.", "cyberpunk", "futuristic", "style page"],
    ["Retro Futurism", "Pixel art and gradients blending nostalgia with modern design.", "retro-futurism", "nostalgic", "style page"],
    ["Minimal Luxury", "High-end whitespace with restrained contrast and premium feel.", "minimal-luxury", "premium", "style page"],
  ],
  effects: [
    ["Border Beam", "An animated beam of light that traces the border of an element.", "border-beam", "polished", "continuous"],
    ["Shine Border", "A rotating shine that sweeps around element borders.", "shine-border", "premium", "continuous"],
    ["Animated Beam", "A light beam that travels along a path between two points.", "animated-beam", "connected", "continuous"],
    ["Orbiting Circles", "Circles that orbit around a center point in a solar-system pattern.", "orbiting-circles", "systematic", "continuous"],
    ["Particles", "Floating particles that drift gently across the background.", "particles", "ambient", "continuous"],
    ["Confetti", "Celebration confetti that bursts and falls with physics.", "confetti", "celebratory", "trigger"],
    ["Spotlight Card", "A card whose border glows following the mouse position.", "spotlight-card", "interactive", "mouse move"],
    ["Glare Hover", "A glare light effect that follows the cursor across a surface.", "glare-hover", "interactive", "mouse move"],
    ["Lens", "A magnifying lens that reveals detail on hover.", "lens", "discoverable", "mouse move"],
    ["Magic Card", "A card with a subtle animated gradient border glow.", "magic-card", "enchanted", "continuous"],
    ["Glow Effect", "Elements that emit a soft pulsing glow aura.", "glow-effect", "radiant", "continuous"],
    ["Smooth Cursor", "A custom cursor that follows mouse movement with smooth easing.", "smooth-cursor", "refined", "mouse move"],
    ["Progressive Blur", "Blur that increases with scroll depth for parallax focus.", "progressive-blur", "layered", "scroll"],
    ["Scroll Based Velocity", "Elements that move at different speeds based on scroll velocity.", "scroll-velocity", "parallax", "scroll"],
    ["Icon Cloud", "A 3D sphere of rotating icons or logos.", "icon-cloud", "showcase", "continuous"],
    ["Animated Circular Progress", "A circular progress indicator with smooth fill animation.", "circular-progress", "precise", "value change"],
    ["Laser Path", "A laser beam that travels along a defined path.", "laser-path", "dynamic", "continuous"],
    ["Glow Pulse", "Elements that emit a soft pulsing glow aura.", "glow-pulse", "radiant", "continuous"],
    ["Neon Flicker", "Neon elements that flicker with a retro feel.", "neon-flicker", "electric", "continuous"],
    ["Aurora Flow", "Shifting aurora gradients that flow across the surface.", "aurora-flow", "ethereal", "continuous"],
    ["Star Field", "A field of twinkling stars for immersive backgrounds.", "star-field", "cosmic", "continuous"],
    ["Snow Fall", "Gentle snowflakes falling across the surface.", "snow-fall", "serene", "continuous"],
    ["Fire Effect", "Realistic fire particles rising from the bottom.", "fire-effect", "intense", "continuous"],
    ["Smoke Effect", "Wispy smoke particles drifting upward.", "smoke-effect", "atmospheric", "continuous"],
    ["3D Card Flip", "A card that flips in 3D to reveal content.", "3d-card-flip", "dimensional", "click"],
    ["3D Rotate", "An element that rotates in 3D space.", "3d-rotate", "spatial", "continuous"],
    ["Parallax Depth", "Elements that move at different speeds for depth.", "parallax-depth", "layered", "scroll"],
    ["Scroll Trigger Entry", "Elements that animate in when scrolled into view.", "scroll-trigger", "revealing", "scroll"],
    ["Scroll Parallax", "Background and foreground moving at different speeds.", "scroll-parallax", "immersive", "scroll"],
    ["Scroll Progress", "A visual indicator of scroll position.", "scroll-progress-bar", "informative", "scroll"],
    ["Scroll Snap", "Sections that snap into place when scrolling.", "scroll-snap-sections", "structured", "scroll"],
    ["Text Wave", "Text that animates in a wave pattern.", "text-wave", "kinetic", "continuous"],
    ["Typing Animation", "Simulate keystroke-by-keystroke text entry with a blinking cursor.", "typing", "alive", "on load"],
    ["Animated Shiny Text", "Sweep a light gradient across text for a polished shimmer.", "shiny-text", "polished", "on load"],
    ["Animated Gradient Text", "Shift gradient colors through text for a living color effect.", "gradient-text", "vibrant", "on load"],
    ["Text Reveal", "Reveal text with a circular or directional clip animation.", "text-reveal", "dramatic", "scroll into view"],
    ["Word Rotate", "Cycle through words or phrases with a vertical slide.", "word-rotate", "dynamic", "auto cycle"],
    ["Number Ticker", "Count up or down to a target number with a rolling digit effect.", "number-ticker", "informative", "value change"],
    ["Spinning Text", "Rotate text continuously around a center point.", "spinning-text", "playful", "on load"],
    ["Line Shadow Text", "Cast an animated shadow that follows text like a moving light.", "line-shadow", "depth", "on load"],
    ["Hyper Text", "Scramble text through random characters before settling on the final word.", "hyper-text", "techy", "hover or load"],
    ["Text Highlighter", "Draw a highlight underline beneath text with a wipe animation.", "text-highlight", "emphasis", "scroll into view"],
    ["Text 3D Flip", "Flip text cards in 3D to reveal the next word or phrase.", "text-3d-flip", "dimensional", "auto cycle"],
    ["Dia Text Reveal", "Reveal text with a diagonal mask wipe from corner to corner.", "dia-reveal", "cinematic", "scroll into view"],
    ["Aurora Text", "Apply a shifting aurora borealis gradient to text.", "aurora-text", "ethereal", "on load"],
    ["Sparkles Text", "Scatter twinkling sparkle particles around text.", "sparkles-text", "magical", "on load"],
    ["Morphing Text", "Smoothly morph between different words with shape interpolation.", "morphing-text", "fluid", "auto cycle"],
    ["Comic Text", "Pop text with comic-book outlines and halftone shadows.", "comic-text", "bold", "on load"],
    ["Kinetic Text", "Animate individual letters with staggered entrance motions.", "kinetic-text", "energetic", "scroll into view"],
    ["Dot Pattern", "A subtle repeating dot grid for neutral surface texture.", "dot-pattern", "neutral", "static"],
    ["Grid Pattern", "A fine-line grid that adds structure to flat backgrounds.", "grid-pattern", "structured", "static"],
    ["Striped Pattern", "Diagonal or horizontal stripes for accent backgrounds.", "striped-pattern", "graphic", "static"],
    ["Retro Grid", "A perspective-grid floor effect with vanishing-point lines.", "retro-grid", "retro", "on load"],
    ["Hexagon Pattern", "A repeating hexagonal grid for tech-forward surfaces.", "hexagon-pattern", "technical", "static"],
    ["Flickering Grid", "A grid of dots that flicker in and out at random intervals.", "flickering-grid", "alive", "continuous"],
    ["Animated Grid Pattern", "A grid that pulses or shifts opacity in a wave.", "animated-grid", "subtle", "continuous"],
    ["Interactive Grid Pattern", "A grid that reacts to mouse position with ripple effects.", "interactive-grid", "responsive", "mouse move"],
    ["Ripple", "Expanding circular ripples that emanate from a click point.", "ripple", "tactile", "click"],
    ["Light Rays", "Animated rays of light that rotate from a central point.", "light-rays", "dramatic", "continuous"],
    ["Noise Texture", "A subtle film-grain noise overlay for organic surface feel.", "noise-texture", "organic", "static"],
    ["Aurora Background", "Shifting aurora borealis gradients for immersive hero sections.", "aurora-bg", "ethereal", "continuous"],
    ["Warp Background", "A warping mesh gradient that responds to mouse movement.", "warp-bg", "immersive", "mouse move"],
    ["Meteors", "Diagonal shooting-star streaks that animate across the surface.", "meteors", "dynamic", "continuous"],
  ],
};

const componentGroups = [
  "Actions",
  "Inputs",
  "Feedback",
  "Surfaces",
  "Navigation",
  "Data Display",
];

const componentRows = [
  ["Button", "Actions", "Trigger a primary or secondary action with a clear hierarchy.", "button", "button", "shadcn/ui button", "none"],
  ["Icon Button", "Actions", "Compress a frequent action into a square target with an accessible label.", "button", "button", "shadcn/ui button", "none"],
  ["Split Button", "Actions", "Pair a default action with a secondary menu without crowding the toolbar.", "button", "button + dropdown-menu", "shadcn/ui button + dropdown-menu", "Radix Dropdown Menu"],
  ["Command Button", "Actions", "Open an action or command with a label that feels deliberate and system-like.", "button", "button", "shadcn/ui button", "none"],
  ["Card", "Surfaces", "Group related information and action affordances in a scannable surface.", "card", "card", "shadcn/ui card", "none"],
  ["Command Card", "Surfaces", "Make a clickable card behave like a focused command surface.", "card", "card", "shadcn/ui card", "none"],
  ["Dialog", "Surfaces", "Interrupt the flow only when a user must make a focused decision.", "dialog", "dialog", "shadcn/ui dialog", "Radix Dialog"],
  ["Drawer", "Surfaces", "Reveal secondary detail or editing context from the page edge.", "drawer", "sheet", "shadcn/ui sheet", "Radix Dialog"],
  ["Popover", "Surfaces", "Attach lightweight contextual content to a nearby trigger.", "popover", "popover", "shadcn/ui popover", "Radix Popover"],
  ["Tooltip", "Surfaces", "Explain a compact control without adding persistent UI text.", "tooltip", "tooltip", "shadcn/ui tooltip", "Radix Tooltip"],
  ["Tabs", "Navigation", "Switch between sibling views while preserving page context.", "tabs", "tabs", "shadcn/ui tabs", "Radix Tabs"],
  ["Sidebar", "Navigation", "Anchor app navigation and persistent workspace sections.", "drawer", "sidebar", "shadcn/ui sidebar", "none"],
  ["Breadcrumb", "Navigation", "Show location in a nested product or documentation hierarchy.", "breadcrumb", "breadcrumb", "shadcn/ui breadcrumb", "none"],
  ["Pagination", "Navigation", "Move through large collections without losing scan rhythm.", "pagination", "pagination", "shadcn/ui pagination", "none"],
  ["Command Menu", "Navigation", "Expose search and actions in a fast keyboard-friendly palette.", "command", "command", "shadcn/ui command", "cmdk"],
  ["Search Field", "Inputs", "Let users filter or find content with a native, calm input.", "search", "input", "shadcn/ui input", "none"],
  ["Text Field", "Inputs", "Collect short text with label, helper text, and validation affordances.", "field", "input", "shadcn/ui input", "none"],
  ["Prompt Input", "Inputs", "Compose AI instructions with space for context, actions, and submit state.", "composer", "textarea + button", "shadcn/ui textarea + button", "none"],
  ["Textarea", "Inputs", "Collect longer text without making the form feel heavy.", "field", "textarea", "shadcn/ui textarea", "none"],
  ["Select", "Inputs", "Choose one value from a known set with a compact trigger.", "select", "select", "shadcn/ui select", "Radix Select"],
  ["Combobox", "Inputs", "Search and choose from a larger option set with keyboard support.", "command", "combobox", "shadcn/ui command + popover", "cmdk + Radix Popover"],
  ["Checkbox", "Inputs", "Toggle a single option or select multiple items in a list.", "checkbox", "checkbox", "shadcn/ui checkbox", "Radix Checkbox"],
  ["Radio Group", "Inputs", "Choose exactly one option from a small visible set.", "radio", "radio-group", "shadcn/ui radio-group", "Radix Radio Group"],
  ["Switch", "Inputs", "Toggle a persistent binary setting with immediate clarity.", "toggle", "switch", "shadcn/ui switch", "Radix Switch"],
  ["Slider", "Inputs", "Adjust a numeric value with direct manipulation.", "slider", "slider", "shadcn/ui slider", "Radix Slider"],
  ["Badge", "Data Display", "Label status, category, or metadata without adding visual weight.", "chips", "badge", "shadcn/ui badge", "none"],
  ["Toast", "Feedback", "Report transient feedback without blocking the current task.", "toast", "sonner", "sonner", "Sonner"],
  ["Alert", "Feedback", "Surface important status or warning information inline.", "alert", "alert", "shadcn/ui alert", "none"],
  ["Progress", "Feedback", "Show task completion honestly without over-promising precision.", "progress", "progress", "shadcn/ui progress", "Radix Progress"],
  ["Skeleton", "Feedback", "Reserve layout while content loads, then settle into real content.", "skeleton", "skeleton", "shadcn/ui skeleton", "none"],
  ["Empty State", "Feedback", "Explain why content is missing and offer the next useful action.", "empty", "card + button", "shadcn/ui card + button", "none"],
  ["Copy Confirmation", "Feedback", "Confirm copied content with a tiny state change or lightweight toast.", "toast", "button + sonner", "shadcn/ui button + sonner", "Sonner"],
  ["Table", "Data Display", "Display dense rows with restrained borders and clear column hierarchy.", "table", "table", "shadcn/ui table", "none"],
  ["Table Row", "Data Display", "Make a row scannable, selectable, and action-ready.", "table", "table", "shadcn/ui table", "none"],
  ["Metric Card", "Data Display", "Show one important number with enough context to interpret it.", "metric", "card", "shadcn/ui card", "none"],
  ["Timeline", "Data Display", "Show ordered events or background work in a readable vertical rhythm.", "timeline", "custom", "custom Tailwind component", "none"],
  ["Code Block", "Data Display", "Present copyable code with language, contrast, and restrained controls.", "code", "custom", "custom Tailwind component", "none"],
  ["Copy Button", "Actions", "Copy nearby text or code with clear success feedback.", "button", "button", "shadcn/ui button", "none"],
  ["File Drop Zone", "Inputs", "Invite uploads with clear constraints, state, and fallback action.", "drop", "input", "shadcn/ui input + button", "none"],
  ["Upload Queue", "Feedback", "Track file upload progress with item-level status and recovery.", "progress", "progress + list", "shadcn/ui progress", "Radix Progress"],
  ["Settings Row", "Inputs", "Combine setting label, explanation, and control in one quiet row.", "toggle", "switch", "shadcn/ui switch", "Radix Switch"],
  ["Inspector Panel", "Surfaces", "Show selected-object metadata and actions in a compact side panel.", "drawer", "sheet", "shadcn/ui sheet", "Radix Dialog"],
  ["Bento Grid", "Surfaces", "A responsive grid layout for showcasing features in asymmetric cards.", "bento", "grid", "custom Tailwind component", "none"],
  ["Hero Video Dialog", "Surfaces", "A play-button overlay that opens a video in a dialog.", "hero-video", "dialog", "shadcn/ui dialog", "Radix Dialog"],
  ["Tweet Card", "Surfaces", "Embed a styled tweet preview with author and engagement stats.", "tweet-card", "card", "custom Tailwind component", "none"],
  ["Avatar Circles", "Data Display", "Overlapping avatar circles that show a group of users.", "avatar-circles", "custom", "custom Tailwind component", "none"],
  ["File Tree", "Data Display", "A nested file and folder tree with expand/collapse.", "file-tree", "custom", "custom Tailwind component", "none"],
  ["Code Comparison", "Data Display", "Side-by-side before/after code with diff highlighting.", "code-comparison", "custom", "custom Tailwind component", "none"],
  ["Safari", "Surfaces", "A Safari browser mockup frame for showcasing web content.", "safari-mock", "custom", "custom Tailwind component", "none"],
  ["iPhone", "Surfaces", "An iPhone device mockup for showcasing mobile apps.", "iphone-mock", "custom", "custom Tailwind component", "none"],
  ["Android", "Surfaces", "An Android device mockup for showcasing mobile apps.", "android-mock", "custom", "custom Tailwind component", "none"],
];

const componentAnatomy = {
  button: ["Root", "Label", "Leading icon", "Trailing icon", "Loading indicator"],
  card: ["Root", "Header", "Title", "Description", "Content", "Footer action"],
  dialog: ["Overlay", "Content", "Header", "Title", "Description", "Footer actions"],
  drawer: ["Root", "Handle", "Header", "Content", "Action area"],
  popover: ["Trigger", "Content", "Arrow", "Dismiss area"],
  tooltip: ["Trigger", "Content", "Arrow"],
  tabs: ["Root", "List", "Trigger", "Indicator", "Panel"],
  breadcrumb: ["List", "Item", "Separator", "Current page"],
  pagination: ["Root", "Previous", "Page item", "Ellipsis", "Next"],
  command: ["Root", "Input", "Group", "Item", "Shortcut", "Empty state"],
  search: ["Root", "Icon", "Input", "Clear action", "Result count"],
  field: ["Root", "Label", "Control", "Helper text", "Error text"],
  composer: ["Root", "Textarea", "Context chip", "Tool action", "Submit"],
  select: ["Trigger", "Value", "Content", "Item", "Indicator"],
  checkbox: ["Root", "Indicator", "Label", "Description"],
  radio: ["Root", "Item", "Indicator", "Label", "Description"],
  toggle: ["Root", "Thumb", "Label", "Description"],
  slider: ["Root", "Track", "Range", "Thumb", "Value label"],
  chips: ["Root", "Label", "Icon", "Remove action"],
  toast: ["Root", "Title", "Description", "Action", "Close"],
  alert: ["Root", "Icon", "Title", "Description", "Action"],
  progress: ["Root", "Track", "Indicator", "Label"],
  skeleton: ["Root", "Block", "Line", "Avatar placeholder"],
  empty: ["Root", "Icon", "Title", "Description", "Primary action"],
  table: ["Table", "Header", "Row", "Cell", "Status badge", "Row action"],
  metric: ["Root", "Label", "Value", "Delta", "Sparkline"],
  timeline: ["Root", "Marker", "Connector", "Title", "Timestamp"],
  code: ["Root", "Header", "Language", "Code", "Copy action"],
  drop: ["Root", "Drop target", "Icon", "Instructions", "Browse action"],
  bento: ["Grid", "Card", "Header", "Content", "Footer"],
  "hero-video": ["Container", "Thumbnail", "Play button", "Dialog", "Video player"],
  "tweet-card": ["Card", "Avatar", "Author", "Content", "Engagement"],
  "avatar-circles": ["Stack", "Avatar", "Overlap", "Count"],
  "file-tree": ["Root", "Folder", "File", "Icon", "Indent"],
  "code-comparison": ["Container", "Left pane", "Right pane", "Header", "Diff highlight"],
  "safari-mock": ["Frame", "Toolbar", "Address bar", "Content area"],
  "iphone-mock": ["Frame", "Notch", "Screen", "Home indicator"],
  "android-mock": ["Frame", "Status bar", "Screen", "Navigation"],
};

const componentEntries = componentRows.map(([name, group, description, preview, sourcePrimitive, recommendedBase, radixPrimitive]) => {
  const slug = slugify(name);
  const defaultAnatomy = componentAnatomy[preview] || componentAnatomy[sourcePrimitive] || ["Root", "Label", "Content", "Action"];
  const defaultVariants = group === "Feedback"
    ? ["default", "muted", "success", "warning", "destructive"]
    : group === "Inputs"
      ? ["default", "muted", "error", "disabled"]
      : ["default", "muted", "outline", "ghost", "destructive"];
  const defaultStates = group === "Inputs"
    ? ["default", "hover", "focus-visible", "disabled", "error", "filled"]
    : group === "Surfaces"
      ? ["default", "open", "hover", "focus-visible", "disabled"]
      : ["default", "hover", "focus-visible", "active", "disabled", "loading"];

  return {
    id: `components-${slug}`,
    slug,
    category: "components",
    title: name,
    name,
    group,
    description,
    preview,
    feeling: "polished",
    trigger: "user interaction",
    sourcePrimitive,
    recommendedBase,
    anatomy: defaultAnatomy,
    variants: defaultVariants,
    states: defaultStates,
    tokens: {
      radius: "8px or less",
      border: "1px solid rgba(237, 237, 236, 0.14)",
      background: "neutral surface with subtle contrast",
      foreground: "high-contrast text",
      mutedForeground: "secondary text at 68-74% contrast",
      focusRing: "2px neutral ring with offset",
      shadow: "soft elevation only when interaction needs tactility",
      motionDuration: "120ms-220ms",
    },
    accessibility: [
      "Use semantic HTML or the matching Radix primitive before custom roles.",
      "Keep focus-visible states obvious without adding decorative glow.",
      "Ensure icon-only controls have an accessible label.",
      "Do not rely on color alone for state or validation.",
    ],
    implementation: {
      shadcnBase: recommendedBase,
      radixPrimitive,
      tailwindStrategy: "Use shadcn tokens for background, border, ring, muted text, radius, and state variants. Keep component-specific classes local and copyable.",
      dependencyNote: radixPrimitive === "none" ? "No extra primitive required beyond React and Tailwind." : `Use ${radixPrimitive} through the matching shadcn component when possible.`,
    },
    heroUI: `${name} can map to a HeroUI component only as an optional adapter. Keep UnBoring copy and token language framework-neutral.`,
  };
});

const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category]));
const navFor = (current) =>
  [
    ...categories.map((category) => `<a href="/${category.slug}/"${category.slug === current ? ' aria-current="page"' : ""}>${category.nav}</a>`),
    `<a href="/about/"${current === "about" ? ' aria-current="page"' : ""}>About</a>`,
  ].join("");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const entries = [
  ...Object.entries(rawEntries).flatMap(([category, rows]) =>
  rows.map(([title, description, preview, feeling, trigger], index) => {
    const slug = slugify(title);
    const motionCategories = ["motion", "text-effects", "effects"];
    return {
      id: `${category}-${slug}`,
      slug,
      category,
      title,
      description,
      preview,
      feeling,
      trigger,
      duration: motionCategories.includes(category) ? ["160ms", "180ms", "220ms", "320ms", "420ms"][index % 5] : "160ms",
      easing: motionCategories.includes(category) ? "cubic-bezier(0.22, 1, 0.36, 1)" : "ease-out",
    };
  }),
),
  ...componentEntries,
];

const componentPromptFor = (entry) =>
  `Create a ${entry.name} component for an AI-generated interface using shadcn-style composition. Use ${entry.recommendedBase} as the implementation base. The component should support ${entry.variants.join(", ")} variants and ${entry.states.join(", ")} states. Include clear anatomy for ${entry.anatomy.join(", ")}. Keep the visual language black, white, and gray with subtle borders, practical spacing, accessible focus states, and no decorative noise.`;

const componentNegativeFor = (entry) =>
  `Do not invent a custom component API when ${entry.recommendedBase} already covers the base behavior. Avoid random gradients, oversized radii, unclear disabled states, missing labels, icon-only controls without accessible names, and variants that change layout unexpectedly.`;

const promptFor = (entry) =>
  entry.category === "components"
    ? componentPromptFor(entry)
    : `Create a ${entry.title} pattern for an AI-generated interface. It should help with ${entry.description.toLowerCase()} Use a restrained black, white, and gray visual style, strong hierarchy, and product-grade spacing. The interaction should feel ${entry.feeling}, practical, and easy to scan.`;

const negativeFor = (entry) =>
  entry.category === "components"
    ? componentNegativeFor(entry)
    : `Do not make the ${entry.title.toLowerCase()} flashy, noisy, over-animated, or decorative for its own sake. Avoid random glow, heavy gradients, excessive borders, oversized type, unclear hierarchy, and generic SaaS filler.`;

const tokensFor = (entry) => ({
  id: entry.slug,
  category: entry.category,
  trigger: entry.trigger,
  target: entry.title.toLowerCase(),
  duration: entry.duration,
  easing: entry.easing,
  feeling: [entry.feeling, "practical", "precise"],
  palette: ["black", "white", "gray"],
  ...(entry.category === "components" ? entry.tokens : {}),
});

const decorative = (markup) => `<div aria-hidden="true">${markup}</div>`;

const previewMarkup = (entry) => {
  const label = escapeHtml(entry.title);
  const type = entry.preview;
  const name = entry.name || entry.title;

  // ── shadcn-quality component previews ──
  if (name === "Button") {
    return decorative(`<div class="sc-row"><button class="sc-btn sc-btn-default">Button</button><button class="sc-btn sc-btn-outline">Outline</button><button class="sc-btn sc-btn-ghost">Ghost</button><button class="sc-btn sc-btn-destructive">Destructive</button></div>`);
  }
  if (name === "Card") {
    return decorative(`<div class="sc-card"><div class="sc-card-header"><div class="sc-card-title">Login to your account</div><div class="sc-card-desc">Enter your email below to login</div></div><div class="sc-card-body"><div class="sc-field"><label class="sc-label">Email</label><input class="sc-input" placeholder="m@example.com" readonly /></div><div class="sc-field"><label class="sc-label">Password</label><input class="sc-input" type="password" value="password" readonly /></div></div><div class="sc-card-footer"><button class="sc-btn sc-btn-default sc-btn-full">Login</button></div></div>`);
  }
  if (name === "Text Field" || name === "Search Field") {
    return decorative(`<div class="sc-field-group"><label class="sc-label">Email</label><input class="sc-input" placeholder="Enter your email..." readonly /><p class="sc-hint">We'll never share your email with anyone.</p></div>`);
  }
  if (name === "Badge") {
    return decorative(`<div class="sc-badge-row"><span class="sc-badge">Default</span><span class="sc-badge sc-badge-secondary">Secondary</span><span class="sc-badge sc-badge-outline">Outline</span><span class="sc-badge sc-badge-destructive">Destructive</span></div>`);
  }
  if (name === "Toast") {
    return decorative(`<div class="sc-toast-stack"><div class="sc-toast"><div class="sc-toast-body"><div class="sc-toast-title">Event created</div><div class="sc-toast-desc">Monday, January 3rd at 6:00 PM</div></div><button class="sc-toast-action">Undo</button></div></div>`);
  }

  // ── Actions ──
  if (name === "Icon Button") {
    return decorative(`<div class="sc-row"><button class="sc-btn sc-btn-outline" style="width:36px;padding:0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button><button class="sc-btn sc-btn-outline" style="width:36px;padding:0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button><button class="sc-btn sc-btn-outline" style="width:36px;padding:0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div>`);
  }
  if (name === "Split Button") {
    return decorative(`<div class="sc-row"><div style="display:flex"><button class="sc-btn sc-btn-default" style="border-radius:6px 0 0 6px">Save</button><button class="sc-btn sc-btn-default" style="border-radius:0 6px 6px 0;border-left:1px solid rgba(255,255,255,0.2);padding:0 8px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button></div></div>`);
  }
  if (name === "Command Button") {
    return decorative(`<div class="sc-row"><button class="sc-btn sc-btn-outline"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>Open Command</button></div>`);
  }
  if (name === "Copy Button") {
    return decorative(`<div class="sc-copy-demo"><span class="sc-copy-text">npm install shadcn</span><button class="sc-copy-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button></div>`);
  }

  // ── Inputs ──
  if (name === "Prompt Input") {
    return decorative(`<div class="sc-card" style="width:min(300px,88%)"><div style="padding:12px;display:flex;flex-wrap:wrap;gap:6px"><span class="sc-badge sc-badge-outline" style="font-size:0.7rem">📄 report.pdf</span><span class="sc-badge sc-badge-outline" style="font-size:0.7rem">📎 data.csv</span></div><div style="padding:0 12px 8px;font-size:0.82rem;color:#a3a3a3">Summarize the key findings...</div><div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-top:1px solid #f5f5f4"><span style="font-size:0.82rem;cursor:pointer;color:#a3a3a3">+</span><span style="font-size:0.82rem;cursor:pointer;color:#a3a3a3">📎</span><button class="sc-btn sc-btn-default sc-btn-sm" style="margin-left:auto;height:28px;padding:0 12px;font-size:0.72rem">Send</button></div></div>`);
  }
  if (name === "Textarea") {
    return decorative(`<div class="sc-field-group"><label class="sc-label">Message</label><textarea class="sc-textarea" placeholder="Type your message here..." readonly></textarea><p class="sc-hint">Your message will be processed by our AI.</p></div>`);
  }
  if (name === "Select") {
    return decorative(`<div class="sc-field-group"><label class="sc-label">Framework</label><div class="sc-select"><span>Select a framework</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div></div>`);
  }
  if (name === "Combobox") {
    return decorative(`<div class="sc-command-menu" style="width:min(260px,82%)"><div class="sc-command-input"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span>Search framework...</span></div><div class="sc-command-list"><div class="sc-command-item">React</div><div class="sc-command-item">Vue</div><div class="sc-command-item">Svelte</div></div></div>`);
  }
  if (name === "Checkbox") {
    return decorative(`<div class="sc-checkbox-group"><div class="sc-checkbox-row"><div class="sc-checkbox"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></div><span>Accept terms and conditions</span></div><div class="sc-checkbox-row"><div class="sc-checkbox-unchecked"></div><span>Subscribe to newsletter</span></div></div>`);
  }
  if (name === "Radio Group") {
    return decorative(`<div class="sc-radio-group"><div class="sc-radio-row"><div class="sc-radio"></div><span>Default</span></div><div class="sc-radio-row"><div class="sc-radio-unchecked"></div><span>Comfortable</span></div><div class="sc-radio-row"><div class="sc-radio-unchecked"></div><span>Compact</span></div></div>`);
  }
  if (name === "Switch") {
    return decorative(`<div style="display:flex;flex-direction:column;gap:14px"><div style="display:flex;align-items:center;gap:10px"><div class="sc-switch"></div><span style="font-size:0.82rem;color:#0a0a0a">Airplane Mode</span></div><div style="display:flex;align-items:center;gap:10px"><div class="sc-switch sc-switch-off"></div><span style="font-size:0.82rem;color:#0a0a0a">Bluetooth</span></div></div>`);
  }
  if (name === "Slider") {
    return decorative(`<div class="sc-slider"><div class="sc-slider-track"><div class="sc-slider-fill"></div><div class="sc-slider-thumb"></div></div></div>`);
  }
  if (name === "File Drop Zone") {
    return decorative(`<div class="sc-dropzone"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><div><strong>Click to upload</strong> or drag and drop</div><span>SVG, PNG, JPG or GIF (max. 800x400px)</span></div>`);
  }
  if (name === "Settings Row") {
    return decorative(`<div class="sc-settings"><div class="sc-setting-row"><div class="sc-setting-text"><strong>Share across devices</strong><span>Sync settings between your devices</span></div><div class="sc-switch"></div></div><div class="sc-setting-row"><div class="sc-setting-text"><strong>Auto-update</strong><span>Keep apps up to date automatically</span></div><div class="sc-switch sc-switch-off"></div></div></div>`);
  }

  // ── Feedback ──
  if (name === "Alert") {
    return decorative(`<div class="sc-alert"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg><div><div class="sc-alert-title">Heads up!</div><div class="sc-alert-desc">You can add components to your app using the CLI.</div></div></div>`);
  }
  if (name === "Progress") {
    return decorative(`<div class="sc-progress"><div class="sc-progress-header"><span>Uploading file...</span><span>68%</span></div><div class="sc-progress-bar"><div class="sc-progress-fill" style="width:68%"></div></div></div>`);
  }
  if (name === "Skeleton") {
    return decorative(`<div class="sc-skeleton-group"><div class="sc-skeleton-row"><div class="sc-skeleton-avatar"></div><div class="sc-skeleton-lines"><div class="sc-skeleton-line"></div><div class="sc-skeleton-line"></div></div></div><div class="sc-skeleton-row"><div class="sc-skeleton-avatar"></div><div class="sc-skeleton-lines"><div class="sc-skeleton-line"></div><div class="sc-skeleton-line"></div></div></div></div>`);
  }
  if (name === "Empty State") {
    return decorative(`<div class="sc-empty"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/></svg><div class="sc-empty-title">No projects found</div><div class="sc-empty-desc">You haven't created any projects yet. Start by creating one.</div><button class="sc-btn sc-btn-default" style="margin-top:8px">Create Project</button></div>`);
  }
  if (name === "Copy Confirmation") {
    return decorative(`<div class="sc-copy-demo"><span class="sc-copy-text">npm install shadcn</span><button class="sc-copy-btn sc-copied"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></button></div>`);
  }
  if (name === "Upload Queue") {
    return decorative(`<div class="sc-upload-queue"><div class="sc-upload-item"><div class="sc-upload-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="sc-upload-info"><div class="sc-upload-name">design-system-v3.fig</div><div class="sc-upload-size">2.4 MB</div><div class="sc-upload-bar"><div class="sc-upload-bar-fill" style="width:100%"></div></div></div><div class="sc-upload-status">Done</div></div><div class="sc-upload-item"><div class="sc-upload-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="sc-upload-info"><div class="sc-upload-name">assets-export.zip</div><div class="sc-upload-size">18.7 MB</div><div class="sc-upload-bar"><div class="sc-upload-bar-fill" style="width:42%"></div></div></div><div style="font-size:0.72rem;color:#737373;flex-shrink:0">42%</div></div></div>`);
  }

  // ── Surfaces ──
  if (name === "Dialog") {
    return decorative(`<div class="sc-dialog-overlay"><button class="sc-dialog-close"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button><div class="sc-dialog-title">Edit profile</div><div class="sc-dialog-desc">Make changes to your profile here. Click save when you're done.</div><div class="sc-field"><label class="sc-label">Name</label><input class="sc-input" value="Pedro Duarte" readonly /></div><div class="sc-field" style="margin-top:10px"><label class="sc-label">Username</label><input class="sc-input" value="@peduarte" readonly /></div><div class="sc-dialog-actions" style="margin-top:16px"><button class="sc-btn sc-btn-outline">Cancel</button><button class="sc-btn sc-btn-default">Save changes</button></div></div>`);
  }
  if (name === "Drawer") {
    return decorative(`<div class="sc-drawer"><div class="sc-drawer-main"><div class="sc-skeleton-line" style="width:60%"></div><div class="sc-skeleton-line" style="width:80%"></div><div class="sc-skeleton-line" style="width:45%"></div></div><div class="sc-drawer-side"><div class="sc-drawer-handle"></div><div class="sc-skeleton-line" style="width:70%"></div><div class="sc-skeleton-line" style="width:50%"></div><button class="sc-btn sc-btn-default" style="margin-top:auto;height:32px;font-size:0.72rem">Submit</button></div></div>`);
  }
  if (name === "Popover") {
    return decorative(`<div style="display:flex;flex-direction:column;align-items:center;gap:8px"><button class="sc-btn sc-btn-outline">Open popover</button><div style="width:min(260px,82%);padding:14px;border-radius:12px;border:1px solid #e5e5e5;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,0.08)"><div style="font-size:0.86rem;font-weight:600;color:#0a0a0a;margin-bottom:4px">Dimensions</div><div style="font-size:0.82rem;color:#737373;margin-bottom:12px">Set the dimensions for the layer.</div><div class="sc-field"><label class="sc-label">Width</label><input class="sc-input" value="100%" readonly /></div><div class="sc-field" style="margin-top:8px"><label class="sc-label">Height</label><input class="sc-input" value="25px" readonly /></div></div></div>`);
  }
  if (name === "Tooltip") {
    return decorative(`<div class="sc-tooltip-demo"><button class="sc-tooltip-trigger-btn">Hover me</button><div class="sc-tooltip-bubble"><span>Add to library</span></div></div>`);
  }
  if (name === "Inspector Panel") {
    return decorative(`<div class="sc-drawer" style="height:180px"><div class="sc-drawer-main"><div class="sc-skeleton-line" style="width:50%"></div><div class="sc-skeleton-line" style="width:70%"></div><div class="sc-skeleton-line" style="width:40%"></div><div class="sc-skeleton-line" style="width:60%"></div></div><div class="sc-drawer-side" style="width:50%"><div class="sc-drawer-handle"></div><div style="font-size:0.76rem;font-weight:600;color:#0a0a0a;margin-bottom:6px">Properties</div><div class="sc-field"><label class="sc-label" style="font-size:0.72rem">Name</label><input class="sc-input" style="height:28px;font-size:0.76rem" value="Hero" readonly /></div><div class="sc-field" style="margin-top:6px"><label class="sc-label" style="font-size:0.72rem">Color</label><input class="sc-input" style="height:28px;font-size:0.76rem" value="#0a0a0a" readonly /></div></div></div>`);
  }

  // ── Navigation ──
  if (name === "Tabs") {
    return decorative(`<div class="sc-tabs"><div class="sc-tab-list"><span class="sc-tab-item sc-active">Account</span><span class="sc-tab-item">Password</span><span class="sc-tab-item">Settings</span></div><div class="sc-tab-panel"><div class="sc-field"><label class="sc-label">Name</label><input class="sc-input" value="Pedro Duarte" readonly /></div><div class="sc-field" style="margin-top:8px"><label class="sc-label">Email</label><input class="sc-input" value="ped@example.com" readonly /></div></div></div>`);
  }
  if (name === "Sidebar") {
    return decorative(`<div class="sc-sidebar"><div class="sc-sidebar-item sc-active"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</div><div class="sc-sidebar-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Users</div><div class="sc-sidebar-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>Projects</div><div class="sc-sidebar-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>Settings</div></div>`);
  }
  if (name === "Breadcrumb") {
    return decorative(`<div style="width:min(300px,86%);display:flex;flex-direction:column;gap:12px"><nav class="sc-breadcrumb"><span class="sc-breadcrumb-link">Home</span><span class="sc-breadcrumb-sep">/</span><span class="sc-breadcrumb-link">Components</span><span class="sc-breadcrumb-sep">/</span><span class="sc-breadcrumb-current">Breadcrumb</span></nav><div style="font-size:1.1rem;font-weight:600;color:#0a0a0a">Breadcrumb</div><div style="display:flex;flex-direction:column;gap:6px"><div class="sc-skeleton-line" style="width:80%"></div><div class="sc-skeleton-line" style="width:60%"></div></div></div>`);
  }
  if (name === "Pagination") {
    return decorative(`<div class="sc-pagination"><button class="sc-page-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></button><button class="sc-page-btn">1</button><button class="sc-page-btn sc-active">2</button><button class="sc-page-btn">3</button><button class="sc-page-btn">4</button><button class="sc-page-btn">5</button><button class="sc-page-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button></div>`);
  }
  if (name === "Command Menu") {
    return decorative(`<div class="sc-command-menu"><div class="sc-command-input"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span>Type a command or search...</span></div><div class="sc-command-list"><div class="sc-command-group-label">Suggestions</div><div class="sc-command-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>Calendar<kbd>⌘J</kbd></div><div class="sc-command-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Search Emoji<kbd>⌘K</kbd></div><div class="sc-command-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>Calculator<kbd>⌘L</kbd></div></div></div>`);
  }

  // ── Data Display ──
  if (name === "Table" || name === "Table Row") {
    return decorative(`<div class="sc-table"><div class="sc-table-header"><span><div class="sc-table-checkbox" style="display:inline-block;vertical-align:middle;margin-right:6px"></div>Invoice</span><span>Status</span><span>Amount</span></div><div class="sc-table-row"><span><div class="sc-table-checkbox" style="display:inline-block;vertical-align:middle;margin-right:6px"></div>INV001</span><span class="sc-badge" style="background:#dcfce7;color:#16a34a;border-color:#dcfce7">Paid</span><span>$250.00</span></div><div class="sc-table-row"><span><div class="sc-table-checkbox" style="display:inline-block;vertical-align:middle;margin-right:6px"></div>INV002</span><span class="sc-badge sc-badge-outline">Pending</span><span>$150.00</span></div><div class="sc-table-row"><span><div class="sc-table-checkbox" style="display:inline-block;vertical-align:middle;margin-right:6px"></div>INV003</span><span class="sc-badge sc-badge-outline">Pending</span><span>$350.00</span></div></div>`);
  }
  if (name === "Metric Card") {
    return decorative(`<div class="sc-metric"><div class="sc-metric-label">Total Revenue</div><div class="sc-metric-value">$45,231.89</div><div class="sc-metric-change sc-up"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>+20.1% from last month</div></div>`);
  }
  if (name === "Timeline") {
    return decorative(`<div class="sc-timeline"><div class="sc-tl-item"><div class="sc-tl-dot sc-done"></div><div class="sc-tl-content"><div class="sc-tl-title">Project created</div><div class="sc-tl-desc">Initialized with default template</div><div class="sc-tl-time">2 hours ago</div></div></div><div class="sc-tl-item"><div class="sc-tl-dot sc-done"></div><div class="sc-tl-content"><div class="sc-tl-title">Design approved</div><div class="sc-tl-desc">Client signed off on mockups</div><div class="sc-tl-time">1 hour ago</div></div></div><div class="sc-tl-item"><div class="sc-tl-dot sc-active"></div><div class="sc-tl-content"><div class="sc-tl-title">Development started</div><div class="sc-tl-desc">Building frontend components</div><div class="sc-tl-time">Just now</div></div></div></div>`);
  }
  if (name === "Code Block") {
    return decorative(`<div class="sc-code"><div class="sc-code-header"><span class="sc-code-lang">example.ts</span><button class="sc-code-copy">Copy</button></div><pre class="sc-code-body"><span class="kw">const</span> <span class="fn">greet</span> = (<span class="fn">name</span>: <span class="fn">string</span>) =&gt; {
  <span class="kw">return</span> <span class="str">\`Hello, \${name}!\`</span>;
};

<span class="cm">// Usage</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="fn">greet</span>(<span class="str">"World"</span>));</pre></div>`);
  }

  // ── Motion previews (sm-*) ──
  if (entry.category === "motion" && entry.title === "Calm Staggered Fade Up") {
    return decorative(`<div class="sm-stagger"><div class="sm-stagger-card"><div class="sm-stagger-title">Dashboard loaded</div><div class="sm-stagger-desc">3 new updates since your last visit</div><div class="sm-stagger-bar"><div class="sm-stagger-bar-fill"></div></div></div><div class="sm-stagger-card"><div class="sm-stagger-title">Projects synced</div><div class="sm-stagger-desc">All team workspaces are up to date</div><div class="sm-stagger-bar"><div class="sm-stagger-bar-fill"></div></div></div><div class="sm-stagger-card"><div class="sm-stagger-title">Notifications</div><div class="sm-stagger-desc">2 items need your attention</div><div class="sm-stagger-bar"><div class="sm-stagger-bar-fill"></div></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Soft Hover Lift") {
    return decorative(`<div class="sm-hover-lift"><div class="sm-lift-card"><div class="sm-lift-card-title">Design Review</div><div class="sm-lift-card-desc">Finalize the component library and update design tokens</div><div class="sm-lift-card-meta"><span>3 comments</span><span>Updated 2h ago</span></div></div><div class="sm-lift-card"><div class="sm-lift-card-title">API Integration</div><div class="sm-lift-card-desc">Connect the new endpoints and test error handling</div><div class="sm-lift-card-meta"><span>In progress</span><span>Due tomorrow</span></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Snappy Button Press") {
    return decorative(`<div class="sm-press"><button class="sm-press-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>Save changes</button><div class="sm-press-hint">Click to feel the press</div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Toast Slide In") {
    return decorative(`<div class="sm-toast-wrap"><div class="sm-toast"><div class="sm-toast-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg></div><div class="sm-toast-body"><div class="sm-toast-title">Changes saved</div><div class="sm-toast-desc">Your profile has been updated successfully.</div></div><div class="sm-toast-close"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Accordion Expand") {
    return decorative(`<div class="sm-accordion"><div class="sm-acc-item sm-open"><button class="sm-acc-trigger"><span>Shipping details</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button><div class="sm-acc-content"><p class="sm-acc-text">Free shipping on orders over $50. Standard delivery takes 3-5 business days. Express shipping available at checkout.</p></div></div><div class="sm-acc-item"><button class="sm-acc-trigger"><span>Return policy</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button><div class="sm-acc-content"><p class="sm-acc-text">Returns accepted within 30 days of purchase. Items must be unused and in original packaging.</p></div></div><div class="sm-acc-item"><button class="sm-acc-trigger"><span>Warranty</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button><div class="sm-acc-content"><p class="sm-acc-text">All products come with a 2-year manufacturer warranty covering defects.</p></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Command Menu Reveal") {
    return decorative(`<div class="sm-cmd-reveal"><div class="sm-cmd-bar"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span>Search commands...</span></div><div class="sm-cmd-items"><div class="sm-cmd-row"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>Calendar<kbd>⌘J</kbd></div><div class="sm-cmd-row"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Search Users<kbd>⌘K</kbd></div><div class="sm-cmd-row"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>Calculator<kbd>⌘L</kbd></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Inline Save Pulse") {
    return decorative(`<div class="sm-save-pulse"><div class="sm-save-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></div><span class="sm-save-text">Changes saved successfully</span></div>`);
  }
  if (entry.category === "motion" && entry.title === "Panel Crossfade") {
    return decorative(`<div class="sm-crossfade"><div class="sm-cf-panel sm-cf-panel-1"><div class="sm-cf-title">Overview</div><div class="sm-cf-line" style="width:90%"></div><div class="sm-cf-line" style="width:70%"></div><div class="sm-cf-line" style="width:50%"></div></div><div class="sm-cf-panel sm-cf-panel-2"><div class="sm-cf-title">Analytics</div><div class="sm-cf-line" style="width:80%"></div><div class="sm-cf-line" style="width:60%"></div><div class="sm-cf-line" style="width:40%"></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Focus Ring Draw") {
    return decorative(`<div class="sm-focus-wrap"><label class="sm-focus-label">Email address</label><input class="sm-focus-input" value="alex@example.com" readonly /><span class="sm-focus-hint">We'll never share your email.</span></div>`);
  }
  if (entry.category === "motion" && entry.title === "Stepper Advance") {
    return decorative(`<div class="sm-stepper"><div class="sm-step sm-step-done"><div class="sm-step-dot"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></div><span class="sm-step-label">Account</span><div class="sm-step-line"></div></div><div class="sm-step sm-step-active"><div class="sm-step-dot">2</div><span class="sm-step-label">Details</span><div class="sm-step-line"></div></div><div class="sm-step"><div class="sm-step-dot">3</div><span class="sm-step-label">Confirm</span></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Skeleton Settle") {
    return decorative(`<div class="sm-skeleton-wrap"><div class="sm-skel-row"><div class="sm-skel-avatar"></div><div class="sm-skel-lines"><div class="sm-skel-line"></div><div class="sm-skel-line"></div></div></div><div class="sm-skel-row"><div class="sm-skel-avatar"></div><div class="sm-skel-lines"><div class="sm-skel-line"></div><div class="sm-skel-line"></div></div></div><div class="sm-skel-row"><div class="sm-skel-avatar"></div><div class="sm-skel-lines"><div class="sm-skel-line"></div><div class="sm-skel-line"></div></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Drawer Slide") {
    return decorative(`<div class="sm-drawer-wrap"><div class="sm-drawer-main"><div class="sc-skeleton-line" style="width:60%"></div><div class="sc-skeleton-line" style="width:80%"></div><div class="sc-skeleton-line" style="width:45%"></div></div><div class="sm-drawer-panel"><div class="sm-drawer-handle"></div><div class="sc-skeleton-line" style="width:70%"></div><div class="sc-skeleton-line" style="width:50%"></div><button class="sc-btn sc-btn-default" style="margin-top:auto;height:30px;font-size:0.72rem">Submit</button></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Tab Underline Glide") {
    return decorative(`<div class="sm-tabs-wrap"><div class="sm-tabs-bar"><span class="sm-tab sm-active">Overview</span><span class="sm-tab">Analytics</span><span class="sm-tab">Settings</span><div class="sm-tab-line"></div></div><div class="sm-tabs-content"><div class="sc-skeleton-line" style="width:85%"></div><div class="sc-skeleton-line" style="width:65%"></div><div class="sc-skeleton-line" style="width:45%"></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Modal Scale In") {
    return decorative(`<div class="sm-modal-wrap"><div class="sm-modal-overlay"><div class="sm-modal-title">Delete this item?</div><div class="sm-modal-desc">This action cannot be undone. The item will be permanently removed from your workspace.</div><div class="sm-modal-actions"><button class="sc-btn sc-btn-outline" style="height:32px;font-size:0.76rem;padding:0 12px">Cancel</button><button class="sc-btn sc-btn-destructive" style="height:32px;font-size:0.76rem;padding:0 12px">Delete</button></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Menu Item Trail") {
    return decorative(`<div class="sm-menu"><div class="sm-menu-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>Edit<kbd>⌘E</kbd></div><div class="sm-menu-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Duplicate<kbd>⌘D</kbd></div><div class="sm-menu-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Share<kbd>⌘S</kbd></div><div class="sm-menu-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>Delete<kbd>⌘⌫</kbd></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Number Count Nudge") {
    return decorative(`<div class="sm-metric-wrap"><div class="sm-metric-label">Active users</div><div class="sm-metric-num">12,847</div><div class="sm-metric-sub">+14.2% from last month</div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Empty State Fade") {
    return decorative(`<div class="sm-empty-wrap"><div class="sm-empty-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/></svg></div><div class="sm-empty-title">No results found</div><div class="sm-empty-desc">Try adjusting your search or filter to find what you're looking for.</div><button class="sc-btn sc-btn-outline" style="height:32px;font-size:0.76rem;padding:0 12px">Clear filters</button></div>`);
  }
  if (entry.category === "motion" && entry.title === "Filter Chip Shift") {
    return decorative(`<div class="sm-chips-wrap"><span class="sm-chip sm-chip-active">Design <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6 6 18M6 6l12 12"/></svg></span><span class="sm-chip">Motion</span><span class="sm-chip">Components</span><span class="sm-chip">+3</span></div>`);
  }
  if (entry.category === "motion" && entry.title === "Progress Bar Ease") {
    return decorative(`<div class="sm-progress-wrap"><div class="sm-progress-head"><span>Processing...</span><span>72%</span></div><div class="sm-progress-track"><div class="sm-progress-bar"></div></div></div>`);
  }
  if (entry.category === "motion" && entry.title === "Tooltip Pop") {
    return decorative(`<div class="sm-tooltip-wrap"><button class="sm-tooltip-btn">Hover me</button><div class="sm-tooltip-bubble"><span>Add to library</span></div></div>`);
  }

  // ── New Motion previews ──
  if (type === "marquee") {
    const items = ['Design System', 'Motion Library', 'Component API', 'Color Tokens', 'Typography Scale', 'Spacing Grid'];
    const row1 = items.map(i => `<div class="marquee-item">${i}</div>`).join('');
    const row2 = items.slice(3).concat(items.slice(0,3)).map(i => `<div class="marquee-item">${i}</div>`).join('');
    return decorative(`<div class="preview-marquee" style="width:90%"><div class="marquee-track">${row1}${row1}</div><div class="marquee-track reverse" style="margin-top:8px">${row2}${row2}</div></div>`);
  }
  if (type === "blur-fade") {
    return decorative(`<div class="preview-blur-fade"><div class="blur-fade-item" style="width:100%"></div><div class="blur-fade-item"></div><div class="blur-fade-item"></div></div>`);
  }

  // ── GSAP-powered Motion previews ──
  if (type === "scroll-reveal") {
    return decorative(`<div class="sm-scroll-reveal" style="width:min(280px,84%);height:180px;position:relative;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><div class="sm-sr-track"><div class="sm-sr-card"><div class="sm-sr-dot"></div><div><div class="sm-sr-line" style="width:80px"></div><div class="sm-sr-line" style="width:50px;margin-top:4px"></div></div></div><div class="sm-sr-card"><div class="sm-sr-dot"></div><div><div class="sm-sr-line" style="width:70px"></div><div class="sm-sr-line" style="width:40px;margin-top:4px"></div></div></div><div class="sm-sr-card"><div class="sm-sr-dot"></div><div><div class="sm-sr-line" style="width:90px"></div><div class="sm-sr-line" style="width:60px;margin-top:4px"></div></div></div></div><div class="sm-sr-scrubber"></div></div>`);
  }
  if (type === "parallax-scroll") {
    return decorative(`<div class="sm-parallax" style="width:min(280px,84%);height:160px;position:relative;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><div class="sm-para-bg"></div><div class="sm-para-mid"><div class="sm-para-card"></div><div class="sm-para-card"></div></div><div class="sm-para-fg"><div class="sm-para-label">Depth</div></div><div class="sm-para-scrubber"></div></div>`);
  }
  if (type === "pin-section") {
    return decorative(`<div class="sm-pin-section" style="width:min(280px,84%);height:160px;position:relative;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><div class="sm-pin-track"><div class="sm-pin-block"><div class="sm-pin-badge">Pinned</div><div style="font-size:0.82rem;font-weight:600;color:var(--fg);margin-top:8px">Section stays</div><div style="font-size:0.72rem;color:var(--muted-fg);margin-top:4px">Content animates through</div></div><div class="sm-pin-block"><div class="sm-pin-badge" style="background:var(--card-bg);color:var(--fg)">Layer 2</div><div style="font-size:0.82rem;font-weight:600;color:var(--fg);margin-top:8px">Slides over</div></div></div><div class="sm-para-scrubber"></div></div>`);
  }
  if (type === "char-reveal") {
    return decorative(`<div class="sm-char-reveal" style="width:min(280px,84%);height:120px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><div class="sm-char-word"><span class="sm-char-c">M</span><span class="sm-char-c">O</span><span class="sm-char-c">T</span><span class="sm-char-c">I</span><span class="sm-char-c">O</span><span class="sm-char-c">N</span></div></div>`);
  }
  if (type === "word-slide") {
    return decorative(`<div class="sm-word-slide" style="width:min(280px,84%);height:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><div class="sm-ws-word"><span>Less</span></div><div class="sm-ws-word"><span>boring</span></div><div class="sm-ws-word"><span>interfaces</span></div></div>`);
  }
  if (type === "line-reveal") {
    return decorative(`<div class="sm-line-reveal" style="width:min(280px,84%);height:110px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><div class="sm-lr-line"><span>GSAP makes animation</span></div><div class="sm-lr-line"><span>silky smooth across</span></div><div class="sm-lr-line"><span>every browser</span></div></div>`);
  }
  if (type === "svg-draw") {
    return decorative(`<div class="sm-svg-draw" style="width:min(200px,60%);height:120px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><svg width="120" height="80" viewBox="0 0 120 80" fill="none" stroke="var(--fg)" stroke-width="2" stroke-linecap="round"><path class="sm-svg-path" d="M10 40 Q30 10 50 40 T90 40 T110 20"/><circle class="sm-svg-dot" cx="110" cy="20" r="4" fill="var(--fg)" stroke="none"/></svg></div>`);
  }
  if (type === "shape-morph") {
    return decorative(`<div class="sm-shape-morph" style="width:min(200px,60%);height:120px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><div class="sm-morph-shape"><svg width="60" height="60" viewBox="0 0 60 60"><rect class="sm-morph-rect" x="0" y="0" width="60" height="60" rx="8" fill="none" stroke="var(--fg)" stroke-width="2"/><circle class="sm-morph-circle" cx="30" cy="30" r="26" fill="none" stroke="var(--fg)" stroke-width="2" opacity="0"/></svg></div></div>`);
  }
  if (type === "layout-morph") {
    return decorative(`<div class="sm-layout-morph" style="width:min(280px,84%);height:150px;position:relative;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><div class="sm-lm-grid"><div class="sm-lm-card"></div><div class="sm-lm-card"></div><div class="sm-lm-card"></div><div class="sm-lm-card"></div></div></div>`);
  }
  if (type === "timeline-seq") {
    return decorative(`<div class="sm-timeline-seq" style="width:min(280px,84%);height:160px;position:relative;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border);padding:16px"><div class="sm-ts-track"><div class="sm-ts-dot fill">1</div><div class="sm-ts-line"></div><div class="sm-ts-dot">2</div><div class="sm-ts-line"></div><div class="sm-ts-dot">3</div></div><div class="sm-ts-label">Choreographed sequence</div></div>`);
  }
  if (type === "magnetic") {
    return decorative(`<div class="sm-magnetic" style="width:min(200px,60%);height:100px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border);cursor:pointer"><div class="sm-mag-btn"><span>Hover me</span></div></div>`);
  }
  if (type === "motion-path") {
    return decorative(`<div class="sm-motion-path" style="width:min(260px,78%);height:130px;position:relative;overflow:hidden;border-radius:12px;background:var(--dark-bg);border:1px solid var(--border)"><svg class="sm-mp-svg" width="100%" height="100%" viewBox="0 0 260 130"><path class="sm-mp-path" d="M20 100 Q80 10 140 70 T240 30" fill="none" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 4"/><circle class="sm-mp-dot" r="6" fill="var(--fg)"><animateMotion dur="3s" repeatCount="indefinite" path="M20 100 Q80 10 140 70 T240 30"/></circle></svg></div>`);
  }

  // ── Text Effects previews ──
  if (type === "typing") {
    return decorative(`<div class="preview-typing"><div class="typing-line">Building your interface...</div><div class="typing-line" style="margin-top:4px">Done.</div></div>`);
  }
  if (type === "shiny-text") {
    return decorative(`<div class="preview-shiny-text"><span class="shiny-text">UnBoring UI</span></div>`);
  }
  if (type === "gradient-text") {
    return decorative(`<div class="preview-gradient-text"><span class="gradient-text">Beautiful</span></div>`);
  }
  if (type === "text-reveal") {
    return decorative(`<div class="preview-text-reveal"><span class="text-reveal">Hello, World.</span></div>`);
  }
  if (type === "word-rotate") {
    return decorative(`<div class="preview-word-rotate"><div class="word-rotate-container"><div class="word-rotate-item">Interfaces</div><div class="word-rotate-item">Experiences</div><div class="word-rotate-item">Interfaces</div></div></div>`);
  }
  if (type === "number-ticker") {
    return decorative(`<div class="preview-number-ticker"><span class="ticker-digit">1</span><span class="ticker-digit">2</span><span class="ticker-digit">,</span><span class="ticker-digit">8</span><span class="ticker-digit">4</span><span class="ticker-digit">7</span></div>`);
  }
  if (type === "spinning-text") {
    const text = "UNBORING • DESIGN • MOTION • ";
    const chars = text.split('').map((c, i) => `<tspan transform="rotate(${i * 360/text.length} 50 50)" x="50" y="8">${c}</tspan>`).join('');
    return decorative(`<div class="preview-spinning-text"><div class="spinning-text-ring"><svg viewBox="0 0 100 100" width="100" height="100"><defs><path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"/></defs><text font-size="8" fill="var(--fg)" font-weight="600" letter-spacing="2"><textPath href="#circlePath">${text}${text}</textPath></text></svg></div></div>`);
  }
  if (type === "line-shadow") {
    return decorative(`<div class="preview-line-shadow"><span class="line-shadow">Depth</span></div>`);
  }
  if (type === "hyper-text") {
    const word = "INTERFACE";
    const chars = word.split('').map((c, i) => `<span class="hyper-text-char" style="animation-delay:${i*0.06}s">${c}</span>`).join('');
    return decorative(`<div class="preview-hyper-text">${chars}</div>`);
  }
  if (type === "text-highlight") {
    return decorative(`<div class="preview-text-highlight"><span class="text-highlight">Focus here</span></div>`);
  }
  if (type === "text-3d-flip") {
    return decorative(`<div class="preview-text-3d-flip"><span class="text-3d-flip-item">Design</span></div>`);
  }
  if (type === "dia-reveal") {
    return decorative(`<div class="preview-dia-reveal"><span class="dia-reveal">Revealed</span></div>`);
  }
  if (type === "aurora-text") {
    return decorative(`<div class="preview-aurora-text"><span class="aurora-text">Aurora</span></div>`);
  }
  if (type === "sparkles-text") {
    return decorative(`<div class="preview-sparkles-text"><span class="sparkle"></span><span class="sparkle"></span><span class="sparkle"></span><span class="sparkle"></span>Magic</div>`);
  }
  if (type === "morphing-text") {
    return decorative(`<div class="preview-morphing-text"><span class="morphing-text">Transform</span></div>`);
  }
  if (type === "comic-text") {
    return decorative(`<div class="preview-comic-text"><span class="comic-text">POW!</span></div>`);
  }
  if (type === "kinetic-text") {
    const word = "MOTION";
    const letters = word.split('').map((c, i) => `<span class="kinetic-letter">${c}</span>`).join('');
    return decorative(`<div class="preview-kinetic-text">${letters}</div>`);
  }

  // ── Background previews ──
  if (type === "dot-pattern") {
    return decorative(`<div class="preview-dot-pattern" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "grid-pattern") {
    return decorative(`<div class="preview-grid-pattern" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "striped-pattern") {
    return decorative(`<div class="preview-striped-pattern" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "retro-grid") {
    return decorative(`<div class="preview-retro-grid" style="width:90%;height:120px;border-radius:8px"></div>`);
  }
  if (type === "hexagon-pattern") {
    return decorative(`<div class="preview-hexagon-pattern" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "flickering-grid") {
    return decorative(`<div class="preview-flickering-grid" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "animated-grid") {
    return decorative(`<div class="preview-animated-grid" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "interactive-grid") {
    return decorative(`<div class="preview-interactive-grid" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "ripple") {
    return decorative(`<div class="preview-ripple" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"></div>`);
  }
  if (type === "light-rays") {
    return decorative(`<div class="preview-light-rays" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"></div>`);
  }
  if (type === "noise-texture") {
    return decorative(`<div class="preview-noise-texture" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"></div>`);
  }
  if (type === "aurora-bg") {
    return decorative(`<div class="preview-aurora-bg" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "warp-bg") {
    return decorative(`<div class="preview-warp-bg" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "meteors") {
    return decorative(`<div class="preview-meteors" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"><div class="meteor"></div><div class="meteor"></div><div class="meteor"></div></div>`);
  }

  // ── Effects previews ──
  if (type === "border-beam") {
    return decorative(`<div class="preview-border-beam" style="width:80%;height:80px;display:grid;place-items:center;background:var(--dark-bg)"><span style="font-size:0.82rem;color:var(--muted-fg)">Hover to see effect</span></div>`);
  }
  if (type === "shine-border") {
    return decorative(`<div class="preview-shine-border" style="width:80%;height:80px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border)"><span style="font-size:0.82rem;color:var(--muted-fg)">Shine effect</span></div>`);
  }
  if (type === "animated-beam") {
    return decorative(`<div class="preview-animated-beam" style="width:90%;height:80px;position:relative"><svg width="100%" height="100%" viewBox="0 0 200 80"><circle cx="20" cy="40" r="8" fill="var(--dark-bg)" stroke="var(--border)" stroke-width="1.5"/><circle cx="180" cy="40" r="8" fill="var(--dark-bg)" stroke="var(--border)" stroke-width="1.5"/><path class="beam-path" d="M28 40 C60 20 140 60 172 40" fill="none" stroke="#667eea" stroke-width="2"/></svg></div>`);
  }
  if (type === "orbiting-circles") {
    return decorative(`<div class="preview-orbiting-circles" style="width:80px;height:80px;position:relative"><div style="position:absolute;top:50%;left:50%;width:12px;height:12px;margin:-6px;border-radius:50%;background:var(--fg);opacity:0.3"></div><div class="orbit-item"></div><div class="orbit-item"></div><div class="orbit-item"></div></div>`);
  }
  if (type === "particles") {
    return decorative(`<div class="preview-particles" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"><div class="particle"></div><div class="particle"></div><div class="particle"></div><div class="particle"></div></div>`);
  }
  if (type === "confetti") {
    return decorative(`<div class="preview-confetti" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"><div class="confetti-piece"></div><div class="confetti-piece"></div><div class="confetti-piece"></div><div class="confetti-piece"></div></div>`);
  }
  if (type === "spotlight-card") {
    return decorative(`<div class="preview-spotlight-card" style="width:80%;height:80px;display:grid;place-items:center"><span style="font-size:0.82rem;color:var(--muted-fg)">Move mouse over</span></div>`);
  }
  if (type === "glare-hover") {
    return decorative(`<div class="preview-glare-hover" style="width:80%;height:80px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border)"><span style="font-size:0.82rem;color:var(--muted-fg)">Hover for glare</span></div>`);
  }
  if (type === "lens") {
    return decorative(`<div class="preview-lens" style="width:80%;height:80px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border)"><span style="font-size:0.82rem;color:var(--muted-fg)">Hover to magnify</span></div>`);
  }
  if (type === "magic-card") {
    return decorative(`<div class="preview-magic-card" style="width:80%;height:80px;display:grid;place-items:center"><span style="font-size:0.82rem;color:var(--muted-fg)">Animated border</span></div>`);
  }
  if (type === "glow-effect") {
    return decorative(`<div class="preview-glow-effect" style="width:80%;height:60px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border);border-radius:8px"><span style="font-size:0.82rem;color:var(--muted-fg)">Pulsing glow</span></div>`);
  }
  if (type === "smooth-cursor") {
    return decorative(`<div class="preview-smooth-cursor" style="width:90%;height:80px;border-radius:8px;background:var(--dark-bg)"><div class="cursor-dot"></div></div>`);
  }
  if (type === "progressive-blur") {
    return decorative(`<div class="preview-progressive-blur" style="width:90%;height:80px;border-radius:8px;background:var(--dark-bg);display:grid;place-items:center"><span style="font-size:0.82rem;color:var(--muted-fg)">Hover to blur</span></div>`);
  }
  if (type === "scroll-velocity") {
    return decorative(`<div class="preview-scroll-velocity" style="width:90%"><div class="velocity-item">Design</div><div class="velocity-item">Motion</div><div class="velocity-item">Effects</div></div>`);
  }
  if (type === "icon-cloud") {
    const icons = ['▲','●','◆','★','■','◎'];
    const items = icons.map((ic, i) => `<div class="icon-item">${ic}</div>`).join('');
    return decorative(`<div class="preview-icon-cloud"><div class="icon-sphere">${items}</div></div>`);
  }
  if (type === "circular-progress") {
    return decorative(`<div class="preview-circular-progress"><svg class="circular-progress-ring" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" fill="none" stroke="var(--border)" stroke-width="4"/><circle cx="30" cy="30" r="25" fill="none" stroke="#667eea" stroke-width="4" stroke-dasharray="157" stroke-dashoffset="47" stroke-linecap="round"/></svg></div>`);
  }
  if (type === "laser-path") {
    return decorative(`<div class="preview-laser-path" style="width:90%;height:80px;position:relative"><svg width="100%" height="100%" viewBox="0 0 200 80"><path class="laser-beam" d="M20 40 C60 20 140 60 180 40" fill="none" stroke="#ff0000" stroke-width="2"/><circle cx="20" cy="40" r="4" fill="#ff0000"/><circle cx="180" cy="40" r="4" fill="#ff0000"/></svg></div>`);
  }
  if (type === "glow-pulse") {
    return decorative(`<div class="preview-glow-pulse" style="width:80%;height:60px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border);border-radius:8px"><span style="font-size:0.82rem;color:var(--muted-fg)">Pulsing glow</span></div>`);
  }
  if (type === "neon-flicker") {
    return decorative(`<div class="preview-neon-flicker" style="width:80%;height:60px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border);border-radius:8px"><span style="font-size:0.82rem;color:#0ff;text-shadow:0 0 10px #0ff">NEON</span></div>`);
  }
  if (type === "aurora-flow") {
    return decorative(`<div class="preview-aurora-flow" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "star-field") {
    return decorative(`<div class="preview-star-field" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"></div>`);
  }
  if (type === "snow-fall") {
    return decorative(`<div class="preview-snow-fall" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"></div>`);
  }
  if (type === "fire-effect") {
    return decorative(`<div class="preview-fire-effect" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"></div>`);
  }
  if (type === "smoke-effect") {
    return decorative(`<div class="preview-smoke-effect" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg)"></div>`);
  }
  if (type === "3d-card-flip") {
    return decorative(`<div class="preview-3d-flip" style="width:80%;height:80px;perspective:300px"><div class="flip-card" style="width:100%;height:100%;position:relative;transform-style:preserve-3d;animation:flip-rotate 4s ease-in-out infinite"><div class="flip-front" style="position:absolute;width:100%;height:100%;backface-visibility:hidden;background:var(--dark-bg);border:1px solid var(--border);border-radius:8px;display:grid;place-items:center"><span style="font-size:0.82rem;color:var(--fg)">Front</span></div><div class="flip-back" style="position:absolute;width:100%;height:100%;backface-visibility:hidden;background:#667eea;border-radius:8px;display:grid;place-items:center;transform:rotateY(180deg)"><span style="font-size:0.82rem;color:#fff">Back</span></div></div></div>`);
  }
  if (type === "3d-rotate") {
    return decorative(`<div class="preview-3d-rotate" style="width:80px;height:80px;perspective:200px"><div class="rotate-cube" style="width:60px;height:60px;position:relative;transform-style:preserve-3d;animation:cube-rotate 6s linear infinite;margin:10px auto"><div class="cube-face" style="position:absolute;width:60px;height:60px;background:rgba(102,126,234,0.3);border:1px solid rgba(102,126,234,0.5);transform:translateZ(30px)"></div><div class="cube-face" style="position:absolute;width:60px;height:60px;background:rgba(118,75,162,0.3);border:1px solid rgba(118,75,162,0.5);transform:rotateY(90deg) translateZ(30px)"></div></div></div>`);
  }
  if (type === "parallax-depth") {
    return decorative(`<div class="preview-parallax-depth" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg);position:relative;overflow:hidden"><div class="parallax-bg" style="position:absolute;inset:0;background:linear-gradient(45deg,rgba(102,126,234,0.1),rgba(118,75,162,0.1));animation:parallax-move 4s ease-in-out infinite"></div><div class="parallax-fg" style="position:absolute;top:50%;left:50%;width:40px;height:40px;background:var(--fg);border-radius:8px;transform:translate(-50%,-50%);animation:parallax-move 4s ease-in-out infinite reverse"></div></div>`);
  }
  if (type === "scroll-trigger") {
    return decorative(`<div class="preview-scroll-trigger" style="width:80%;height:80px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border);border-radius:8px;opacity:0;animation:scroll-appear 2s ease-out infinite"><span style="font-size:0.82rem;color:var(--muted-fg)">Scroll to reveal</span></div>`);
  }
  if (type === "scroll-parallax") {
    return decorative(`<div class="preview-scroll-parallax" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg);position:relative;overflow:hidden"><div class="parallax-layer-back" style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(102,126,234,0.2),rgba(118,75,162,0.2));animation:parallax-scroll 3s ease-in-out infinite"></div><div class="parallax-layer-mid" style="position:absolute;top:30%;left:20%;width:30px;height:30px;background:rgba(255,255,255,0.1);border-radius:4px;animation:parallax-scroll 3s ease-in-out infinite 0.5s"></div><div class="parallax-layer-front" style="position:absolute;top:50%;left:60%;width:20px;height:20px;background:rgba(255,255,255,0.2);border-radius:4px;animation:parallax-scroll 3s ease-in-out infinite 1s"></div></div>`);
  }
  if (type === "scroll-progress-bar") {
    return decorative(`<div class="preview-scroll-progress-bar" style="width:90%;height:100px;border-radius:8px;background:var(--dark-bg);position:relative"><div class="progress-track" style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--border)"><div class="progress-fill" style="height:100%;background:linear-gradient(90deg,#667eea,#764ba2);width:0%;animation:progress-fill 3s ease-out infinite"></div></div><div class="progress-content" style="padding:20px 12px 12px"><div style="height:6px;background:var(--border);border-radius:3px;margin-bottom:8px;width:80%"></div><div style="height:6px;background:var(--border);border-radius:3px;width:60%"></div></div></div>`);
  }
  if (type === "scroll-snap-sections") {
    return decorative(`<div class="preview-scroll-snap" style="width:90%;height:100px;border-radius:8px;display:flex;gap:6px;overflow:hidden"><div class="snap-section" style="flex:1;background:var(--dark-bg);border:1px solid var(--border);border-radius:6px;display:grid;place-items:center;animation:snap-slide 4s ease-in-out infinite"><span style="font-size:0.72rem;color:var(--muted-fg)">1</span></div><div class="snap-section" style="flex:1;background:var(--dark-bg);border:1px solid var(--border);border-radius:6px;display:grid;place-items:center;animation:snap-slide 4s ease-in-out infinite 0.5s"><span style="font-size:0.72rem;color:var(--muted-fg)">2</span></div><div class="snap-section" style="flex:1;background:var(--dark-bg);border:1px solid var(--border);border-radius:6px;display:grid;place-items:center;animation:snap-slide 4s ease-in-out infinite 1s"><span style="font-size:0.72rem;color:var(--muted-fg)">3</span></div></div>`);
  }
  if (type === "text-wave") {
    return decorative(`<div class="preview-text-wave"><span class="wave-letter" style="animation-delay:0s">W</span><span class="wave-letter" style="animation-delay:0.1s">A</span><span class="wave-letter" style="animation-delay:0.2s">V</span><span class="wave-letter" style="animation-delay:0.3s">E</span></div>`);
  }

  // ── Style previews ──
  if (type === "neon-gradient") {
    return decorative(`<div class="preview-neon-gradient" style="width:80%;height:60px;border-radius:8px;display:grid;place-items:center"><span style="font-size:0.82rem;color:#fff;font-weight:600">Neon</span></div>`);
  }
  if (type === "glassmorphism") {
    return decorative(`<div style="width:80%;height:80px;border-radius:12px;background:linear-gradient(135deg,#667eea33,#764ba233);display:grid;place-items:center"><div class="preview-glassmorphism" style="padding:12px 24px;border-radius:8px"><span style="font-size:0.82rem;color:var(--fg);font-weight:600">Glass</span></div></div>`);
  }
  if (type === "gradient-mesh") {
    return decorative(`<div class="preview-gradient-mesh" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "aurora-borealis") {
    return decorative(`<div class="preview-aurora-borealis" style="width:90%;height:100px;border-radius:8px"></div>`);
  }
  if (type === "cyberpunk") {
    return decorative(`<div class="preview-cyberpunk" style="width:90%;height:100px;border-radius:8px;display:grid;place-items:center"><span style="font-size:0.82rem;color:#fff;font-weight:600;text-shadow:0 0 10px #0ff">CYBER</span></div>`);
  }
  if (type === "retro-futurism") {
    return decorative(`<div class="preview-retro-futurism" style="width:90%;height:100px;border-radius:8px;display:grid;place-items:center"><span style="font-size:0.82rem;color:#fff;font-weight:600">RETRO</span></div>`);
  }
  if (type === "minimal-luxury") {
    return decorative(`<div class="preview-minimal-luxury" style="width:90%;height:100px;border-radius:8px;display:grid;place-items:center"><span style="font-size:0.82rem;color:#0a0a0a;font-weight:600">LUXURY</span></div>`);
  }

  // ── Surface previews ──
  if (type === "terminal") {
    return decorative(`<div class="preview-terminal" style="width:90%"><div class="terminal-header"><div class="terminal-dot"></div><div class="terminal-dot"></div><div class="terminal-dot"></div></div><div class="terminal-body"><div><span class="terminal-prompt">$</span> unboring init</div><div style="color:#a6e3a1">✓ Project created</div><div><span class="terminal-prompt">$</span> unboring add motion<span class="terminal-cursor"></span></div></div></div>`);
  }
  if (type === "dock") {
    return decorative(`<div class="preview-dock"><div class="dock-item"></div><div class="dock-item"></div><div class="dock-item"></div><div class="dock-item"></div><div class="dock-item"></div></div>`);
  }
  if (type === "bento") {
    return decorative(`<div class="preview-bento"><div class="bento-card" style="grid-row:span 2"></div><div class="bento-card"></div><div class="bento-card"></div><div class="bento-card"></div><div class="bento-card"></div></div>`);
  }
  if (type === "hero-video") {
    return decorative(`<div class="preview-hero-video"><div class="hero-video-thumb"></div><div class="hero-video-play"><svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>`);
  }
  if (type === "tweet-card") {
    return decorative(`<div class="preview-tweet-card" style="width:85%"><div class="tweet-header"><div class="tweet-avatar"></div><div><div class="tweet-name">Sarah Chen</div><div class="tweet-handle">@sarahchen</div></div></div><div class="tweet-text">UnBoring is exactly what AI-generated UIs needed. Finally, some taste.</div><div class="tweet-actions"><span>♡ 42</span><span>↻ 12</span><span>💬 8</span></div></div>`);
  }
  if (type === "avatar-circles") {
    return decorative(`<div class="preview-avatar-circles"><div class="avatar-circle" style="background:#667eea"></div><div class="avatar-circle" style="background:#764ba2"></div><div class="avatar-circle" style="background:#f093fb"></div><div class="avatar-circle" style="background:#10b981"></div><div class="avatar-circle-more">+5</div></div>`);
  }
  if (type === "file-tree") {
    return decorative(`<div class="preview-file-tree"><div class="tree-item"><span class="tree-icon">📁</span>src</div><div class="tree-item"><span class="tree-indent"></span><span class="tree-icon">📁</span>components</div><div class="tree-item"><span class="tree-indent"></span><span class="tree-indent"></span><span class="tree-icon">📄</span>Button.tsx</div><div class="tree-item"><span class="tree-indent"></span><span class="tree-indent"></span><span class="tree-icon">📄</span>Card.tsx</div><div class="tree-item"><span class="tree-indent"></span><span class="tree-icon">📄</span>index.ts</div></div>`);
  }
  if (type === "code-comparison") {
    return decorative(`<div class="preview-code-comparison" style="font-size:0.7rem"><div class="code-pane"><div class="code-pane-header">Before</div><div class="code-pane-body"><div class="code-line code-line-removed">- old style</div><div class="code-line">  same line</div></div></div><div class="code-pane"><div class="code-pane-header">After</div><div class="code-pane-body"><div class="code-line code-line-added">+ new style</div><div class="code-line">  same line</div></div></div></div>`);
  }
  if (type === "safari-mock") {
    return decorative(`<div class="preview-safari-mock" style="width:90%"><div class="safari-toolbar"><div class="safari-dots"><div class="safari-dot"></div><div class="safari-dot"></div><div class="safari-dot"></div></div><div class="safari-url"></div></div><div class="safari-content"></div></div>`);
  }
  if (type === "iphone-mock") {
    return decorative(`<div class="preview-iphone-mock"><div class="iphone-notch"></div><div class="iphone-screen"></div><div class="iphone-home"></div></div>`);
  }
  if (type === "android-mock") {
    return decorative(`<div class="preview-android-mock"><div class="android-status">9:41</div><div class="android-screen"></div><div class="android-nav"><div class="android-nav-dot"></div><div class="android-nav-dot"></div><div class="android-nav-dot"></div></div></div>`);
  }

  // ── Interactive button previews ──
  if (type === "interactive-hover-button") {
    return decorative(`<div class="preview-interactive-hover-btn" style="padding:12px 24px;background:var(--dark-bg);border:1px solid var(--border);border-radius:8px;cursor:pointer"><span style="font-size:0.82rem;color:var(--fg);font-weight:600">Hover me</span></div>`);
  }
  if (type === "shimmer-button") {
    return decorative(`<div class="preview-shimmer-btn" style="padding:12px 24px;background:#667eea;border-radius:8px;cursor:pointer"><span style="font-size:0.82rem;color:#fff;font-weight:600">Shimmer</span></div>`);
  }
  if (type === "ripple-button") {
    return decorative(`<div class="preview-ripple-btn" style="padding:12px 24px;background:var(--dark-bg);border:1px solid var(--border);border-radius:8px;cursor:pointer"><span style="font-size:0.82rem;color:var(--fg);font-weight:600">Click me</span></div>`);
  }
  if (type === "pulsating-button") {
    return decorative(`<div class="preview-pulsating-btn" style="padding:12px 24px;background:#667eea;border-radius:8px;cursor:pointer"><span style="font-size:0.82rem;color:#fff;font-weight:600">Urgent</span></div>`);
  }
  if (type === "animated-beam") {
    return decorative(`<div class="preview-animated-beam" style="width:90%;height:80px;position:relative"><svg width="100%" height="100%" viewBox="0 0 200 80"><circle cx="20" cy="40" r="8" fill="var(--dark-bg)" stroke="var(--border)" stroke-width="1.5"/><circle cx="180" cy="40" r="8" fill="var(--dark-bg)" stroke="var(--border)" stroke-width="1.5"/><path class="beam-path" d="M28 40 C60 20 140 60 172 40" fill="none" stroke="#667eea" stroke-width="2"/></svg></div>`);
  }
  if (type === "border-beam") {
    return decorative(`<div class="preview-border-beam" style="width:80%;height:80px;display:grid;place-items:center;background:var(--dark-bg)"><span style="font-size:0.82rem;color:var(--muted-fg)">Hover to see effect</span></div>`);
  }
  if (type === "shine-border") {
    return decorative(`<div class="preview-shine-border" style="width:80%;height:80px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border)"><span style="font-size:0.82rem;color:var(--muted-fg)">Shine effect</span></div>`);
  }
  if (type === "glare-hover") {
    return decorative(`<div class="preview-glare-hover" style="width:80%;height:80px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border)"><span style="font-size:0.82rem;color:var(--muted-fg)">Hover for glare</span></div>`);
  }
  if (type === "spotlight-card") {
    return decorative(`<div class="preview-spotlight-card" style="width:80%;height:80px;display:grid;place-items:center"><span style="font-size:0.82rem;color:var(--muted-fg)">Move mouse over</span></div>`);
  }
  if (type === "magic-card") {
    return decorative(`<div class="preview-magic-card" style="width:80%;height:80px;display:grid;place-items:center"><span style="font-size:0.82rem;color:var(--muted-fg)">Animated border</span></div>`);
  }
  if (type === "glow-effect") {
    return decorative(`<div class="preview-glow-effect" style="width:80%;height:60px;display:grid;place-items:center;background:var(--dark-bg);border:1px solid var(--border);border-radius:8px"><span style="font-size:0.82rem;color:var(--muted-fg)">Pulsing glow</span></div>`);
  }
  if (type === "smooth-cursor") {
    return decorative(`<div class="preview-smooth-cursor" style="width:90%;height:80px;border-radius:8px;background:var(--dark-bg)"><div class="cursor-dot"></div></div>`);
  }
  if (type === "magnetic-button") {
    return decorative(`<div class="preview-magnetic-btn" style="padding:12px 24px;background:var(--dark-bg);border:1px solid var(--border);border-radius:8px;cursor:pointer"><span style="font-size:0.82rem;color:var(--fg);font-weight:600">Magnetic</span></div>`);
  }
  if (type === "morphing-button") {
    return decorative(`<div class="preview-morphing-btn" style="padding:12px 24px;background:#667eea;border-radius:8px;cursor:pointer"><span style="font-size:0.82rem;color:#fff;font-weight:600">Morph</span></div>`);
  }
  if (type === "tool-call-status") {
    return decorative(`<div class="preview-tool-call"><div class="tc-header"><div class="tc-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div><span class="tc-name">Web Search</span><div class="tc-status tc-running">Running</div></div><div class="tc-body"><div class="tc-line"></div><div class="tc-line" style="width:70%"></div></div></div>`);
  }
  if (type === "agent-thinking") {
    return decorative(`<div class="preview-agent-thinking"><div class="at-dots"><div class="at-dot"></div><div class="at-dot"></div><div class="at-dot"></div></div><span class="at-text">Agent is thinking...</span></div>`);
  }
  if (type === "streaming-text") {
    return decorative(`<div class="preview-streaming-text"><div class="st-line">Analyzing your request...</div><div class="st-line">Based on the data provided,</div><div class="st-line">I recommend the following<span class="st-cursor"></span></div></div>`);
  }
  if (type === "context-attachment") {
    return decorative(`<div class="preview-context-attach"><div class="ca-chips"><div class="ca-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>report.pdf</div><div class="ca-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>data.csv</div></div><div class="ca-input">Summarize the key findings...</div></div>`);
  }
  if (type === "model-selector") {
    return decorative(`<div class="preview-model-selector"><div class="ms-trigger"><span>GPT-4o</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div></div>`);
  }
  if (type === "token-counter") {
    return decorative(`<div class="preview-token-counter"><div class="tc-bar"><div class="tc-fill"></div></div><div class="tc-info"><span class="tc-used">1,247 tokens</span><span class="tc-limit">/ 4,096</span></div></div>`);
  }
  if (type === "prompt-history") {
    return decorative(`<div class="preview-prompt-history"><div class="ph-item"><div class="ph-text">Explain quantum computing</div><div class="ph-time">2h ago</div></div><div class="ph-item"><div class="ph-text">Write a React component</div><div class="ph-time">1d ago</div></div><div class="ph-item"><div class="ph-text">Debug this error</div><div class="ph-time">3d ago</div></div></div>`);
  }
  if (type === "output-diff") {
    return decorative(`<div class="preview-output-diff"><div class="od-pane"><div class="od-header">Before</div><div class="od-body"><div class="od-line od-removed">- Old implementation</div><div class="od-line">  Same code here</div></div></div><div class="od-pane"><div class="od-header">After</div><div class="od-body"><div class="od-line od-added">+ New implementation</div><div class="od-line">  Same code here</div></div></div></div>`);
  }

  // ── New Interaction previews ──
  if (type === "swipe-dismiss") {
    return decorative(`<div class="preview-swipe-dismiss"><div class="swipe-card"><div class="swipe-avatar"></div><div class="swipe-text"><div class="swipe-name">Meeting notes</div><div class="swipe-sub">Updated 2 min ago</div></div></div><div class="swipe-action">Delete</div></div>`);
  }
  if (type === "pull-refresh") {
    return decorative(`<div class="preview-pull-refresh"><div class="pull-spinner"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Refreshing...</div><div class="pull-list"><div class="pull-item"></div><div class="pull-item"></div><div class="pull-item"></div></div></div>`);
  }
  if (type === "long-press") {
    return decorative(`<div class="preview-long-press"><div class="lp-item"><div class="lp-avatar"></div><div class="lp-text"><div class="lp-name">Design specs</div><div class="lp-sub">3 files</div></div></div><div class="lp-menu"><div class="lp-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>Edit</div><div class="lp-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy</div><div class="lp-menu-divider"></div><div class="lp-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>Delete</div></div></div>`);
  }
  if (type === "drag-handle") {
    return decorative(`<div class="preview-drag-handle"><div class="dh-item"><div class="dh-grip"><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div></div><div class="dh-line" style="width:70%"></div></div><div class="dh-item"><div class="dh-grip"><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div></div><div class="dh-line" style="width:55%"></div></div><div class="dh-item"><div class="dh-grip"><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div><div class="dh-dot"></div></div><div class="dh-line" style="width:80%"></div></div></div>`);
  }
  if (type === "infinite-scroll") {
    return decorative(`<div class="preview-infinite-scroll"><div class="is-item"></div><div class="is-item"></div><div class="is-item"></div><div class="is-spinner"><div class="is-spinner-dot"></div><div class="is-spinner-dot"></div><div class="is-spinner-dot"></div></div></div>`);
  }
  if (type === "scroll-progress") {
    return decorative(`<div class="preview-scroll-progress"><div class="sp-bar"><div class="sp-fill"></div></div><div class="sp-content"><div class="sp-line"></div><div class="sp-line"></div><div class="sp-line"></div></div></div>`);
  }
  if (type === "scroll-snap") {
    return decorative(`<div class="preview-scroll-snap"><div class="snap-card">Section 1</div><div class="snap-card">Section 2</div><div class="snap-card">Section 3</div></div>`);
  }
  if (type === "sticky-header") {
    return decorative(`<div class="preview-sticky-header"><div class="sticky-hdr"><span>My App</span><span style="font-size:0.7rem;color:var(--muted-fg)">Menu</span></div><div class="sticky-body"><div class="sticky-line"></div><div class="sticky-line"></div><div class="sticky-line"></div></div></div>`);
  }
  if (type === "back-to-top") {
    return decorative(`<div class="preview-back-to-top"><div class="btt-content"><div class="btt-line"></div><div class="btt-line"></div><div class="btt-line"></div></div><div class="btt-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg></div></div>`);
  }
  if (type === "field-validation") {
    return decorative(`<div class="preview-field-validation"><div class="fv-field"><div class="fv-label">Email</div><div class="fv-input-wrap fv-success"><span class="fv-input-text">alex@example.com</span><svg class="fv-icon fv-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div><span class="fv-msg fv-success-msg">Email is valid</span></div><div class="fv-field"><div class="fv-label">Username</div><div class="fv-input-wrap fv-error"><span class="fv-input-text">ab</span><svg class="fv-icon fv-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></div><span class="fv-msg fv-error-msg">Must be at least 3 characters</span></div></div>`);
  }
  if (type === "char-counter") {
    return decorative(`<div class="preview-char-counter"><div class="cc-area">The quick brown fox jumps over the lazy dog.</div><div class="cc-bar"><div class="cc-track"><div class="cc-fill"></div></div><span class="cc-count">182 / 250</span></div></div>`);
  }
  if (type === "password-strength") {
    return decorative(`<div class="preview-password-strength"><div class="ps-input">••••••••</div><div class="ps-meter"><div class="ps-segment ps-active"></div><div class="ps-segment ps-active"></div><div class="ps-segment ps-active"></div><div class="ps-segment"></div></div><span class="ps-label">Strong</span></div>`);
  }
  if (type === "multi-step") {
    return decorative(`<div class="preview-multi-step"><div class="ms-step"><div class="ms-dot ms-done"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></div><span class="ms-label">Account</span><div class="ms-line ms-done"></div></div><div class="ms-step ms-active"><div class="ms-dot ms-active">2</div><span class="ms-label">Details</span><div class="ms-line"></div></div><div class="ms-step"><div class="ms-dot">3</div><span class="ms-label">Done</span></div></div>`);
  }
  if (type === "autocomplete") {
    return decorative(`<div class="preview-autocomplete"><div class="ac-input"><svg class="ac-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span>Re</span></div><div class="ac-dropdown"><div class="ac-item ac-highlighted"><span class="ac-match">Re</span>act</div><div class="ac-item"><span class="ac-match">Re</span>adme</div><div class="ac-item"><span class="ac-match">Re</span>dux</div></div></div>`);
  }
  if (type === "optimistic-toggle") {
    return decorative(`<div class="preview-optimistic-toggle"><div class="ot-row"><span class="ot-label">Dark mode</span><div class="ot-switch"></div></div><div class="ot-row"><span class="ot-label">Notifications</span><div class="ot-switch ot-off"></div></div></div>`);
  }
  if (type === "error-retry") {
    return decorative(`<div class="preview-error-retry"><div class="er-banner"><svg class="er-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg><div class="er-text"><div class="er-title">Failed to save</div><div class="er-desc">Check your connection and try again.</div></div><button class="er-btn">Retry</button></div></div>`);
  }
  if (type === "success-check") {
    return decorative(`<div class="preview-success-check"><div class="sc-circle"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div></div>`);
  }
  if (type === "skeleton-pulse") {
    return decorative(`<div class="preview-skeleton-pulse"><div class="sk-row"><div class="sk-avatar"></div><div class="sk-lines"><div class="sk-line"></div><div class="sk-line"></div></div></div><div class="sk-row"><div class="sk-avatar"></div><div class="sk-lines"><div class="sk-line"></div><div class="sk-line"></div></div></div></div>`);
  }
  if (type === "context-menu") {
    return decorative(`<div class="preview-context-menu"><div class="cm-trigger">Right-click here</div><div class="cm-menu"><div class="cm-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>Edit</div><div class="cm-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy</div><div class="cm-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Share</div><div class="cm-divider"></div><div class="cm-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>Delete</div></div></div>`);
  }
  if (type === "toast-stack") {
    return decorative(`<div class="preview-toast-stack"><div class="ts-toast"><div class="ts-dot ts-success"></div><span>Changes saved</span></div><div class="ts-toast"><div class="ts-dot ts-info"></div><span>New comment</span></div><div class="ts-toast"><div class="ts-dot ts-error"></div><span>Upload failed</span></div></div>`);
  }
  if (type === "sticky-footer") {
    return decorative(`<div class="preview-sticky-footer"><div class="sf-content"><div class="sf-line"></div><div class="sf-line"></div></div><div class="sf-bar"><span class="sf-bar-label">3 items selected</span><button class="sf-bar-btn">Continue</button></div></div>`);
  }

  // ── Original preview system ──
  if (type === "cards") {
    return decorative(`<div class="mini-stack refined-card-stack"><div class="mini-card"><span class="mini-line"></span><span class="mini-line short"></span></div><div class="mini-card"><span class="mini-line"></span><span class="mini-line short"></span></div><div class="mini-card"><span class="mini-line"></span><span class="mini-line short"></span></div></div>`);
  }
  if (type === "card") {
    return decorative(`<div class="hover-card refined-hover-card"><span class="mini-line"></span><span class="mini-line short"></span><span class="refined-corner"></span></div>`);
  }
  if (type === "button") {
    return decorative(`<span class="press-button">${label.length > 14 ? "Continue" : label}</span>`);
  }
  if (type === "command" || type === "search") {
    return decorative(`<div class="command-panel refined-command"><div class="command-input"></div><div class="command-row"></div><div class="command-row"></div><div class="command-row compact-row"></div></div>`);
  }
  if (type === "accordion") {
    return decorative(`<div class="accordion-demo open"><div class="accordion-head">Details <span>+</span></div><div class="accordion-content"><div class="accordion-body">Reveal only what is needed right now.</div></div></div>`);
  }
  if (type === "toast") {
    return decorative(`<div class="toast-wrap"><div class="toast"><strong>Done</strong><span>${label}</span></div></div>`);
  }
  return decorative(`<div class="demo-object demo-${type}"><span>${label}</span><i></i><i></i><i></i></div>`);
};

const card = (entry, className = "idea-card") => `
  <a class="${className}" href="/${entry.category}/${entry.slug}/">
    <div class="preview" aria-label="${escapeHtml(entry.title)} preview">${previewMarkup(entry)}</div>
    <div class="card-copy">
      <span class="card-kicker mono">${escapeHtml(categoryBySlug[entry.category].nav)}</span>
      <h3>${escapeHtml(entry.title)}</h3>
      <p class="purpose">${escapeHtml(entry.description)}</p>
      ${entry.category === "components" ? `<div class="component-card-meta"><span>${escapeHtml(entry.group)}</span><span>${escapeHtml(entry.sourcePrimitive)}</span><span>ready</span></div>` : ""}
    </div>
  </a>`;

const listItems = (items, className = "spec-list") => `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

const tokenRows = (tokens) => `
  <div class="token-table">
    ${Object.entries(tokens).map(([key, value]) => `<div><span class="mono">${escapeHtml(key)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
  </div>`;

const componentDocBlock = (title, body, eyebrow = "") => `
  <section class="component-doc-block">
    ${eyebrow ? `<span class="card-kicker mono">${escapeHtml(eyebrow)}</span>` : ""}
    <h2>${escapeHtml(title)}</h2>
    ${body}
  </section>`;

const shell = ({ title, description, canonical, current, body, scripts = true, jsonLd = "" }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <link rel="canonical" href="${canonical}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Bebas+Neue&family=Caveat:wght@400;700&family=DM+Serif+Display&family=Fredoka:wght@400;600;700&family=Orbitron:wght@400;700&family=Oswald:wght@400;700&family=Permanent+Marker&family=Playfair+Display:wght@400;700&family=Press+Start+2P&family=Righteous&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/styles.css?v=${assetVersion}" />
    <link rel="icon" href="/favicon.svg" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow" />
    <meta name="theme-color" content="#c8ff3d" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="UnBoring" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${socialImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${socialImage}" />
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonical,
      isPartOf: {
        "@type": "WebSite",
        name: "UnBoring",
        url: site,
      },
    })}</script>
    ${jsonLd}
  </head>
  <body>
    <header class="site-header">
      <nav class="nav" aria-label="Main navigation">
        <a class="brand mono" href="/">UnBoring</a>
        <div class="nav-links mono">
          ${navFor(current)}
        </div>
      </nav>
    </header>
    ${body}
    ${footer(current)}
    ${scripts ? `<script src="/assets/app.js?v=${assetVersion}"></script>` : ""}
  </body>
</html>`;

const footer = (current) => `
    <footer class="site-footer">
      <div class="page footer-grid">
        <div><h3 class="mono">UnBoring</h3><p>Less boring UI language for humans and agents.</p></div>
        <div><h3 class="mono">Library</h3>${categories.map((category) => `<a href="/${category.slug}/"${category.slug === current ? ' aria-current="page"' : ""}>${category.nav}</a>`).join("")}</div>
        <div><h3 class="mono">Machine-readable</h3><a href="/agent/">MCP ready</a><a href="/agent/">CLI planned</a></div>
        <div><h3 class="mono">Open source</h3><a href="/about/">Why UnBoring</a><a href="https://github.com/boyang-workspace/Unboring">GitHub</a></div>
      </div>
    </footer>`;

const categoryPage = (category) => {
  const items = entries.filter((entry) => entry.category === category.slug);
  const featured = items.slice(0, 3);
  if (category.slug === "components") {
    return componentCategoryPage(category, items, featured);
  }
  return shell({
    title: `${category.title} - UnBoring`,
    description: `${category.title} ideas for less boring AI-generated interfaces with previews, prompts, negative prompts, and tokens.`,
    canonical: `${site}/${category.slug}/`,
    current: category.slug,
    body: `
    <main class="page">
      <section class="hero compact category-hero" aria-labelledby="page-title">
        <div>
          <div class="hero-meta mono" data-left="// category&#10;// ${category.slug}" data-right="${items.length} demos" aria-hidden="true"><span class="hero-rule"></span></div>
          <p class="eyebrow mono">${escapeHtml(category.eyebrow)}</p>
          <h1 id="page-title">${escapeHtml(category.title)}</h1>
          <p class="subtitle">${escapeHtml(category.description)}</p>
        </div>
        <div class="category-preview-strip">${featured.map((entry) => `<div class="preview">${previewMarkup(entry)}</div>`).join("")}</div>
      </section>
      <section class="dark-section" aria-labelledby="library-title">
        <div class="category-toolbar">
          <div>
            <span class="card-kicker mono">${escapeHtml(category.accent)}</span>
            <h2 id="library-title">Browse ${escapeHtml(category.title.toLowerCase())}</h2>
          </div>
          <p>Open any card for the preview, AI prompt, negative prompt, motion or design tokens, and SEO notes.</p>
        </div>
        <div class="idea-grid library-grid">
          ${items.map((entry) => card(entry)).join("")}
        </div>
      </section>
    </main>`,
  });
};

const componentCategoryPage = (category, items, featured) =>
  shell({
    title: "Components - UnBoring",
    description: "A shadcn-style open component directory with previews, anatomy, variants, states, tokens, accessibility notes, prompts, and implementation guidance.",
    canonical: `${site}/components/`,
    current: "components",
    body: `
    <main class="page">
      <section class="hero compact category-hero" aria-labelledby="page-title">
        <div>
          <div class="hero-meta mono" data-left="// shadcn-style&#10;// component library" data-right="${items.length} components" aria-hidden="true"><span class="hero-rule"></span></div>
          <p class="eyebrow mono">Open components. Human language. Agent-ready structure.</p>
          <h1 id="page-title">Components</h1>
          <p class="subtitle">${escapeHtml(category.description)}</p>
        </div>
        <div class="category-preview-strip">${featured.map((entry) => `<div class="preview">${previewMarkup(entry)}</div>`).join("")}</div>
      </section>
      <section class="dark-section" aria-labelledby="component-groups">
        <div class="component-library-intro">
          <div>
            <span class="card-kicker mono">registry-ready docs</span>
            <h2 id="component-groups">Component groups</h2>
          </div>
          <p>Each component now has anatomy, variants, states, styling tokens, accessibility notes, AI prompts, negative prompts, and shadcn implementation guidance.</p>
        </div>
        <div class="component-group-strip">
          ${componentGroups.map((group) => `<a href="#${slugify(group)}"><span>${escapeHtml(group)}</span><strong>${items.filter((item) => item.group === group).length}</strong></a>`).join("")}
        </div>
        ${componentGroups.map((group) => {
          const groupItems = items.filter((entry) => entry.group === group);
          return `<section class="component-group-section" id="${slugify(group)}"><div class="grid-heading"><div><span class="card-kicker mono">${groupItems.length} components</span><h2>${escapeHtml(group)}</h2></div></div><div class="idea-grid library-grid">${groupItems.map((entry) => card(entry)).join("")}</div></section>`;
        }).join("")}
      </section>
    </main>`,
  });

const detailPage = (entry) => {
  if (entry.category === "components") {
    return componentDetailPage(entry);
  }
  const category = categoryBySlug[entry.category];
  const promptId = `prompt-${entry.slug}`;
  const negativeId = `negative-${entry.slug}`;
  const tokensId = `tokens-${entry.slug}`;
  const related = entries
    .filter((item) => item.category === entry.category && item.slug !== entry.slug)
    .slice(0, 3);

  const usageFaq = [
    ["When should I use this?", `Use ${entry.title} when you need ${entry.description.toLowerCase()} It works best when the interface needs clarity before spectacle.`],
    ["What should I avoid?", negativeFor(entry)],
    ["How should I describe it to AI?", promptFor(entry)],
  ];

  return shell({
    title: `${entry.title} - UnBoring`,
    description: `${entry.description} Includes AI prompt, negative prompt, tokens, and demo guidance.`,
    canonical: `${site}/${entry.category}/${entry.slug}/`,
    current: entry.category,
    jsonLd: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: usageFaq.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: {
          "@type": "Answer",
          text,
        },
      })),
    })}</script>`,
    body: `
    <main class="page">
      <section class="hero compact detail-hero" aria-labelledby="page-title">
        <div>
          <div class="hero-meta mono" data-left="// ${category.nav.toLowerCase()} detail" data-right="id: ${entry.slug}" aria-hidden="true"><span class="hero-rule"></span></div>
          <h1 id="page-title">${escapeHtml(entry.title)}</h1>
        </div>
      </section>
      <section class="dark-section">
        <div class="detail-layout">
          <div>
            <div class="preview detail-preview" aria-label="${escapeHtml(entry.title)} preview">${previewMarkup(entry)}</div>
            <p class="detail-copy">${escapeHtml(entry.description)}</p>
          </div>
          <div class="code-grid">
            ${codeBlock("AI Prompt", "Copy prompt", promptId, promptFor(entry))}
            ${codeBlock("Negative Prompt", "Copy negative", negativeId, negativeFor(entry))}
            ${codeBlock("Tokens", "Copy tokens", tokensId, JSON.stringify(tokensFor(entry), null, 2))}
          </div>
        </div>
      </section>
      <section class="dark-section seo-section" aria-labelledby="seo-title">
        <div class="grid-heading">
          <div>
            <h2 id="seo-title">Usage notes</h2>
            <p>Short guidance for humans and AI tools before copying the pattern.</p>
          </div>
        </div>
        <div class="faq-grid">
          ${usageFaq.map(([title, body]) => faq(title, body)).join("")}
        </div>
      </section>
      <section class="dark-section" aria-labelledby="related-title">
        <div class="grid-heading"><div><h2 id="related-title">Related ${escapeHtml(category.title.toLowerCase())}</h2></div></div>
        <div class="idea-grid related-grid">${related.map((item) => card(item)).join("")}</div>
      </section>
    </main>`,
  });
};

const componentDetailPage = (entry) => {
  const promptId = `prompt-${entry.slug}`;
  const negativeId = `negative-${entry.slug}`;
  const tokensId = `tokens-${entry.slug}`;
  const implementationId = `implementation-${entry.slug}`;
  const related = componentEntries
    .filter((item) => item.group === entry.group && item.slug !== entry.slug)
    .slice(0, 3);
  const implementationText = [
    `Base: ${entry.implementation.shadcnBase}`,
    `Primitive: ${entry.implementation.radixPrimitive}`,
    `Tailwind: ${entry.implementation.tailwindStrategy}`,
    `Dependency: ${entry.implementation.dependencyNote}`,
  ].join("\n");
  const usageFaq = [
    ["What is this component for?", `${entry.name} helps teams ${entry.description.charAt(0).toLowerCase() + entry.description.slice(1)} It should feel like a reusable product primitive, not a one-off decoration.`],
    ["How should I implement it?", `Start from ${entry.implementation.shadcnBase}. ${entry.implementation.dependencyNote} Keep variants token-driven and keep states predictable.`],
    ["What should I avoid?", componentNegativeFor(entry)],
  ];

  return shell({
    title: `${entry.name} Component - UnBoring`,
    description: `${entry.description} Includes anatomy, variants, states, styling tokens, accessibility notes, shadcn implementation guidance, and AI prompts.`,
    canonical: `${site}/components/${entry.slug}/`,
    current: "components",
    jsonLd: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: `${entry.name} Component`,
      description: entry.description,
      about: ["UI component", "shadcn", "design system"],
    })}</script>`,
    body: `
    <main class="page">
      <section class="hero compact detail-hero component-detail-hero" aria-labelledby="page-title">
        <div>
          <div class="hero-meta mono" data-left="// component detail" data-right="${entry.group}" aria-hidden="true"><span class="hero-rule"></span></div>
          <h1 id="page-title">${escapeHtml(entry.name)}</h1>
          <p class="subtitle">${escapeHtml(entry.description)}</p>
        </div>
      </section>
      <section class="dark-section">
        <div class="detail-layout">
          <div>
            <div class="preview detail-preview component-preview" aria-label="${escapeHtml(entry.name)} component preview">${previewMarkup(entry)}</div>
            <div class="component-meta-panel">
              <span>${escapeHtml(entry.group)}</span>
              <span>${escapeHtml(entry.sourcePrimitive)}</span>
              <span>${escapeHtml(entry.recommendedBase)}</span>
            </div>
          </div>
          <div class="code-grid">
            ${codeBlock("AI Prompt", "Copy prompt", promptId, componentPromptFor(entry))}
            ${codeBlock("Negative Prompt", "Copy negative", negativeId, componentNegativeFor(entry))}
            ${codeBlock("Implementation Notes", "Copy notes", implementationId, implementationText)}
            ${codeBlock("Tokens", "Copy tokens", tokensId, JSON.stringify(tokensFor(entry), null, 2))}
          </div>
        </div>
      </section>
      <section class="dark-section component-spec-section" aria-labelledby="spec-title">
        <div class="grid-heading"><div><span class="card-kicker mono">copy-ready details</span><h2 id="spec-title">Component spec</h2></div></div>
        <div class="component-spec-grid">
          ${componentDocBlock("Overview", `<p>${escapeHtml(entry.description)} This entry is written as a registry-ready component spec: useful to humans, copyable by AI tools, and easy to map to a future shadcn registry item.</p>`, "component")}
          ${componentDocBlock("Anatomy", listItems(entry.anatomy), "structure")}
          ${componentDocBlock("Variants", listItems(entry.variants), "visual API")}
          ${componentDocBlock("States", listItems(entry.states), "behavior")}
        </div>
      </section>
      <section class="dark-section">
        <div class="component-spec-grid">
          ${componentDocBlock("Styling tokens", tokenRows(entry.tokens), "tokens")}
          ${componentDocBlock("Accessibility notes", listItems(entry.accessibility), "a11y")}
          ${componentDocBlock("shadcn implementation", `<p>${escapeHtml(entry.implementation.dependencyNote)}</p><p>${escapeHtml(entry.implementation.tailwindStrategy)}</p>`, entry.implementation.shadcnBase)}
          ${componentDocBlock("HeroUI mapping", `<p>${escapeHtml(entry.heroUI)}</p>`, "optional adapter")}
        </div>
      </section>
      <section class="dark-section seo-section" aria-labelledby="component-faq-title">
        <div class="grid-heading"><div><h2 id="component-faq-title">Usage notes</h2><p>Short guidance for humans and AI tools before copying the component.</p></div></div>
        <div class="faq-grid">${usageFaq.map(([title, body]) => faq(title, body)).join("")}</div>
      </section>
      <section class="dark-section" aria-labelledby="related-title">
        <div class="grid-heading"><div><h2 id="related-title">Related ${escapeHtml(entry.group.toLowerCase())}</h2></div></div>
        <div class="idea-grid related-grid">${related.map((item) => card(item)).join("")}</div>
      </section>
    </main>`,
  });
};

const codeBlock = (title, button, id, value) => `
  <section class="code-block">
    <header><span>${escapeHtml(title)}</span><button class="button small" type="button" data-copy="${id}">${escapeHtml(button)}</button></header>
    <pre id="${id}">${escapeHtml(value)}</pre>
  </section>`;

const faq = (title, body) => `
  <div class="seo-accordion" data-accordion>
    <button class="seo-accordion-head" type="button" aria-expanded="false">${escapeHtml(title)} <span aria-hidden="true">+</span></button>
    <div class="seo-accordion-content"><p>${escapeHtml(body)}</p></div>
  </div>`;

const homePage = () => {
  const feed = [];
  for (let index = 0; index < 6; index += 1) {
    categories.forEach((category) => {
      const entry = entries.filter((item) => item.category === category.slug)[index];
      if (entry) feed.push(entry);
    });
  }

  return shell({
    title: "UnBoring - UI inspiration for less boring AI interfaces",
    description:
      "UnBoring is a free open-source UI inspiration library with previews, AI prompts, negative prompts, and structured tokens for AI-generated interfaces.",
    canonical: `${site}/inspire/`,
    current: "",
    body: `
    <main class="page">
      <section class="hero" aria-labelledby="page-title">
        <div>
          <div class="hero-meta mono" data-left="// unboring.openagent.bot&#10;// open source ui inspiration" data-right="mcp / cli ready" aria-hidden="true"><span class="hero-rule"></span></div>
          <p class="eyebrow mono">AI-generated UI is too boring. Give it better taste vocabulary.</p>
          <h1 id="page-title">UnBoring</h1>
          <p class="subtitle">A browseable library of UI ideas, motion details, component patterns, interaction moments, AI prompts, negative prompts, and structured tokens.</p>
          <div class="actions" aria-label="Page actions"><a class="button primary" href="#browse">Start browsing</a><a class="button" href="/agent/">MCP / CLI plan</a></div>
        </div>
      </section>
      <section class="dark-section" aria-labelledby="why-title">
        <div class="intro"><h2 id="why-title">Steal the idea. Keep the taste.</h2><p>UnBoring turns visual taste into reusable design language. Browse small UI ideas first. Open details when you want the exact prompt, negative prompt, and tokens to recreate the behavior without generic template sludge.</p></div>
      </section>
      <section class="dark-section" aria-labelledby="shelves-title">
        <div class="grid-heading"><div><h2 id="shelves-title">Browse by shelf</h2><p>Lightweight categories. The feed below is where the library starts to feel explorable.</p></div></div>
        <div class="category-strip">${categories.map((category) => `<a class="category-chip mono" href="/${category.slug}/">${category.nav}<span>${entries.filter((entry) => entry.category === category.slug).length} demos</span></a>`).join("")}<a class="category-chip mono" href="/agent/">Agent-ready<span>format</span></a></div>
      </section>
      <section class="dark-section" id="browse" aria-labelledby="feed-title">
        <div class="grid-heading"><div><h2 id="feed-title">Idea feed</h2><p>A masonry-style feed for wandering. Every card opens a full prompt and token detail page.</p></div></div>
        <div class="masonry-grid">${feed.map((entry) => card(entry)).join("")}</div>
      </section>
      <section class="callout" aria-labelledby="agents-title"><div><h2 id="agents-title">Built for humans. Ready for agents.</h2><p>The visible site is for browsing. The structure is for later export: stable ids, categories, prompts, negative prompts, and JSON tokens that can become an MCP resource, CLI search result, or prompt pack.</p></div><a class="button" href="/agent/">MCP / CLI plan</a></section>
    </main>`,
  });
};

const agentPage = () =>
  shell({
    title: "Agent-ready - UnBoring",
    description: "How UnBoring will support MCP, CLI, JSON packs, and agent-readable UI inspiration.",
    canonical: `${site}/agent/`,
    current: "",
    body: `
    <main class="page">
      <section class="hero compact"><div><div class="hero-meta mono" data-left="// machine readable&#10;// mcp / cli planned" data-right="structured tokens" aria-hidden="true"><span class="hero-rule"></span></div><p class="eyebrow mono">The page is for humans. The shape is for agents.</p><h1>Agent-ready</h1><p class="subtitle">Every UnBoring entry is designed to become a stable resource: id, category, preview, AI prompt, negative prompt, and tokens.</p></div></section>
      <section class="dark-section"><div class="intro"><h2>Planned exports</h2><p>MCP resource browsing, CLI search, JSON prompt packs, and category-level exports for vibe-coded products.</p></div></section>
    </main>`,
  });

const aboutPage = () =>
  shell({
    title: "About - UnBoring",
    description:
      "UnBoring helps vibe coders, engineers, product managers, designers, and AI agents find less boring UI design directions, prompts, CSS tokens, and creative interface references.",
    canonical: `${site}/about/`,
    current: "about",
    body: `
    <main class="page">
      <section class="hero compact" aria-labelledby="page-title">
        <div>
          <div class="hero-meta mono" data-left="// product thesis&#10;// open-source design library" data-right="for humans + agents" aria-hidden="true"><span class="hero-rule"></span></div>
          <p class="eyebrow mono">AI-generated UI is too boring. Give it better taste vocabulary.</p>
          <h1 id="page-title">About UnBoring</h1>
          <p class="subtitle">UnBoring helps vibe coders find product and website UI directions they can copy into prompts, CSS, or future agent workflows.</p>
        </div>
      </section>
      <section class="dark-section" aria-labelledby="mission-title">
        <div class="intro">
          <h2 id="mission-title">The mission</h2>
          <p>UnBoring is for people who can build but do not always know how a product should look or move. It turns design inspiration into usable directions: visual styles, motion patterns, interaction ideas, templates, prompts, negative prompts, and structured tokens.</p>
        </div>
      </section>
      <section class="dark-section" aria-labelledby="pain-title">
        <div class="grid-heading"><div><h2 id="pain-title">The pain it solves</h2><p>Vibe coders often spend too many tokens exploring UI ideas and still end up with generic Tailwind, shadcn, oversized hero text, card stacks, and predictable gradients.</p></div></div>
        <div class="category-grid">
          <div class="category-card"><span class="card-kicker mono">01</span><h3>Less token waste</h3><p>Start from concrete design directions instead of asking AI to invent taste from vague adjectives.</p></div>
          <div class="category-card"><span class="card-kicker mono">02</span><h3>Less template gravity</h3><p>Push AI away from default SaaS dashboards and toward styles that fit the project, audience, and mood.</p></div>
          <div class="category-card"><span class="card-kicker mono">03</span><h3>More agent-ready structure</h3><p>Keep every idea copyable by humans and readable by agents through prompts, negative prompts, and tokens.</p></div>
        </div>
      </section>
      <section class="dark-section" aria-labelledby="open-title">
        <div class="intro">
          <h2 id="open-title">Why open source</h2>
          <p>Good design taste should not be locked inside one generator. UnBoring is open source so designers and builders can contribute styles, motion patterns, templates, and design skills that help AI-generated interfaces become more beautiful, diverse, practical, and human.</p>
        </div>
        <div class="actions" aria-label="About actions"><a class="button primary" href="https://github.com/boyang-workspace/Unboring">Contribute on GitHub</a><a class="button" href="/inspire/">Browse the library</a></div>
      </section>
      <section class="callout" aria-labelledby="agent-title">
        <div><h2 id="agent-title">Built for future agents.</h2><p>The public site is the human interface. The underlying shape is meant to become MCP resources, JSON prompt packs, CLI search, and direct agent-callable design references.</p></div>
        <a class="button" href="/agent/">MCP / CLI plan</a>
      </section>
    </main>`,
  });

const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

categories.forEach((category) => fs.rmSync(category.slug, { recursive: true, force: true }));
["surfaces", "text-effects", "backgrounds", "canvas"].forEach((slug) => fs.rmSync(slug, { recursive: true, force: true }));
fs.rmSync("agent", { recursive: true, force: true });

write("inspire/index.html", homePage());
write("agent/index.html", agentPage());
write("about/index.html", aboutPage());
categories.forEach((category) => write(`${category.slug}/index.html`, categoryPage(category)));
entries.forEach((entry) => write(`${entry.category}/${entry.slug}/index.html`, detailPage(entry)));

const urls = [
  `${site}/`,
  `${site}/agent/`,
  `${site}/about/`,
  ...categories.map((category) => `${site}/${category.slug}/`),
  ...entries.map((entry) => `${site}/${entry.category}/${entry.slug}/`),
];

write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join("\n")}\n</urlset>\n`,
);

write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
write("_redirects", `/surfaces/ /interactions/ 301
/surfaces/* /interactions/ 301
/text-effects/ /effects/ 301
/text-effects/* /effects/ 301
/backgrounds/ /effects/ 301
/backgrounds/* /effects/ 301
/canvas/ / 301
/canvas/* / 301
`);

console.log(`Generated ${entries.length} entries across ${categories.length} categories.`);
