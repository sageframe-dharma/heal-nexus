import portraitImage from "@assets/portrait-default.webp";
import doulaImage from "@assets/photo-doula.webp";
import birthImage from "@assets/photo-birth.webp";
import yogaImage from "@assets/photo-yoga-lg.webp";
import ppnImage from "@assets/photo-PPN.webp";
import griefImage from "@assets/photo-grief.webp";
import somaticImage from "@assets/photo-somatic.webp";
import bcstImage from "@assets/photo-bcst.webp";

export interface ServiceInfo {
  name: string;        // hexagon node label (may contain \n for line breaks)
  label: string;       // full readable label for panels and cards
  description: string; // short panel description (Layer 1)
  experienceText: string; // long experience text (Layer 2 /practice page)
  image?: string;
  /** Alternate image used on the landing-page hexagon (falls back to image if absent) */
  hexImage?: string;
  imageScale?: number;
  imagePosition?: string;
}

export const SERVICES: ServiceInfo[] = [
  {
    name: "Biodynamic Craniosacral Therapy",
    label: "Biodynamic Craniosacral Therapy",
    image: bcstImage,
    imagePosition: "top",
    description:
      "A gentle, hands-on therapy that supports your nervous system through light, still touch. You lie fully clothed on a table while I listen to the subtle rhythms in your body and help them find balance. Effective for chronic pain, migraines, anxiety, recovery from injury, and nervous system overwhelm.",
    experienceText:
      "BCST supports the body's inherent health by working with the subtle rhythmic motions that organize the nervous system at its deepest level. In a session, you lie fully clothed on a table. My hands are still or move very slowly — at your head, your feet, your sacrum, wherever your system draws attention.\n\nThere is very little visible happening. Inside, there is often a great deal — warmth, tingling, a sense of settling, unwinding, or release. People describe feeling deeply rested afterward in a way that's different from sleep. Some people process emotions. Some people's pain resolves. Some people fall into a stillness they haven't accessed in years.\n\nThis work is effective for chronic pain, migraines, jaw tension, recovery from surgery or injury, nervous system overwhelm, anxiety, and conditions where the body seems locked in a pattern it can't resolve on its own. It is also deeply supportive during pregnancy, postpartum, and for infants and children — including those with complex needs.\n\nWhat often surprises people is how much can shift from so little apparent intervention. The work is subtle. The results are not.",
  },
  {
    name: "Somatic\nTherapy",
    label: "Somatic Therapy",
    image: somaticImage,
    description:
      "Helps your body release held stress, pain, and trauma through gentle touch and guided awareness. We work with what your nervous system is actually doing — not just what your mind thinks is happening. For anxiety, trauma, chronic stress, emotional overwhelm, and patterns that resist change.",
    experienceText:
      "Somatic therapy works with the body's held material — the old injuries, unfinished responses, and overwhelm that live in tissue and nervous system long after the events that caused them. Sessions may happen on a treatment table, seated, or moving, depending on what your body needs. We begin by paying attention to what's happening right now: sensation, temperature, tension, ease, impulse, stillness.\n\nI may use gentle touch, guided awareness, breath, or movement to support what's emerging. The work meets the body's intelligence on its own terms. I'm not interpreting your experience or telling you what it means. I perceive what your nervous system is doing — whether it's mobilizing, settling, bracing, or completing something it started long ago — and support that process so it can resolve rather than cycle.\n\nPeople come to this work for anxiety, trauma, chronic stress, phobias, emotional overwhelm, and patterns that resist change no matter how well they're understood intellectually. It's also for people who feel disconnected from their bodies and want to come back.\n\nYou don't need a diagnosis or a story. Your body is already telling the story. My job is to help you hear it.",
  },
  {
    name: "Yoga Therapy",
    label: "Yoga Therapy",
    image: yogaImage,
    description:
      "Personalized yoga — postures, breath, and meditation — chosen specifically for your body and situation. This is not a group class. We build a practice you can use between sessions for chronic pain, nervous system regulation, respiratory issues, and rebuilding resilience.",
    experienceText:
      "Yoga therapy applies the tools of yoga — posture, breath, meditation, stillness — with professional precision to your specific body and situation. This is not a group class. We begin with you: your body today, how you stand, how you breathe, where you hold, where you collapse. Then we work.\n\nI might have you in a supported inversion for your nervous system, a standing pose for your spine, a breathing practice for your anxiety. Every choice is specific. A well-chosen posture held with the right support can change the relationship between your ribs and your lungs, between your pelvis and your spine. That's anatomy, informed by a tradition that has been refining these relationships for generations. We build a personal practice you can take home and use between sessions.\n\nPeople come for musculoskeletal issues, nervous system dysregulation, respiratory conditions, recovery from illness, and the steady work of rebuilding resilience in a body that has been through a lot. What keeps people coming back is that the practice meets them exactly where they are — and where they are keeps changing.",
  },
  {
    name: "Pre- & Perinatal\nPsychology",
    label: "Pre- & Perinatal Psychology",
    image: ppnImage,
    description:
      "How we came into the world shapes how we move through it. This work helps adults, parents, and families meet early life patterns through the body — supporting conception, pregnancy, birth preparation, infant bonding, and the resolution of early developmental imprints.",
    experienceText:
      "This work takes different forms depending on who's in the room.\n\nFor adults, it often begins with curiosity — a sense that something from very early life is running in the background, shaping relationships, reactivity, and the sense of safety. We work somatically, through the body, to meet those early patterns where they live. This isn't about recovering memories. It's about noticing what your system does when it feels certain conditions — closeness, separation, nourishment, overwhelm — and allowing those patterns to settle and reorganize.\n\nFor parents and families, the work is more relational. I support couples preparing for conception and birth — not just logistically but in understanding how their own early experiences will show up in their parenting. I help families communicate, attune, and repair. I work with parents individually when their own material comes up in the process of raising their children, which it always does.\n\nFor families with infants and young children, I draw on the Castellino Training and the BEBA model — approaches that center the baby's experience and treat the whole family as the unit of care.\n\nThis work asks for slowness. Early patterns didn't form in a day and they don't reorganize in one session. But they do reorganize, and when they do, the effect moves through everything.",
  },
  {
    name: "Birth, Doula &\nPostpartum",
    label: "Birth, Doula & Postpartum Support",
    image: doulaImage,
    hexImage: birthImage,
    imageScale: 1.3,
    imagePosition: "center 28%",
    description:
      "Continuous support through pregnancy, labor, birth, and the postpartum weeks. Physical and emotional preparation, comfort during labor, advocacy for your preferences, and help finding your footing as a new parent. I also support partners and families.",
    experienceText:
      "During pregnancy, we build a relationship. I learn your body, your concerns, your hopes, what you know and what you need to know. We cover birth physiology, comfort measures, decision-making, and partner support — real preparation for the range of what birth can be, not a single story of how it should go.\n\nDuring labor and birth, I am there. Continuously. Physical support — counter-pressure, positioning, breath coaching, massage. Emotional support — calm, steady presence when things get intense. I advocate for you when you need someone to speak for your preferences, and I make space for you to find your own voice when you can.\n\nIn the postpartum period — the weeks and months when everything is new and most support disappears — I help you tend to your body, find your footing as a parent, navigate feeding and rest, and make sense of the enormous emotional territory that comes with new life. I also support your partner and your family, because birth doesn't happen to one person alone.\n\nI bring bodywork, pre- and perinatal understanding, and two decades of working with families to this role. I also bring my own experience of birth in all its forms — including the ones that don't go as planned.",
  },
  {
    name: "Grief &\nTransitions",
    label: "Grief, Life Transitions & Integrated Health",
    image: griefImage,
    description:
      "For grief, serious illness, caregiving, dying, and the transitions that change who you are. I help people navigate complex medical systems, coordinate care across practitioners, and find accompaniment when what they need most is someone willing to stay present with what's actually happening.",
    experienceText:
      "There is no protocol for grief. There is no technique that makes loss manageable on a schedule. What there is: the presence of another person who is willing to be in it with you without flinching, without rushing, without a plan for how you should feel.\n\nWhen you come to me in grief — whether from the death of someone you love, the loss of your health, the end of a life you expected — I bring my hands, my training, and my attention. We may work with the body through craniosacral or somatic touch. We may sit and breathe. We may talk. I follow what you need, and I don't assume I know what that is before you show me.\n\nFor people living with chronic illness, disability, or complex medical needs — or caring for someone who is — I offer something that most medical systems don't: someone who sees the whole picture. I help coordinate between practitioners and approaches. I support the physical body through bodywork. I help you make sense of what you're going through when the systems you're navigating can only see parts of it. This extends to advocating for children with complex needs and supporting families who are navigating those systems together.\n\nFor people approaching death — their own or someone they love — I offer accompaniment. No agenda. No timeline. The willingness to stay present with what is actually happening, in the body and beyond it.\n\nGrief is not a problem to solve. It's a relationship with what you love. I don't rush this work. I meet what is ready to happen, and I stay.",
  },
];

// Fallback portrait for nodes without a specific image
export { portraitImage };
