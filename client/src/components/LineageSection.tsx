/**
 * LineageSection — parked. Lineage and teacher photos are off the About page
 * for now; Nancy wants them back once the content has been reworked.
 * Not rendered anywhere.
 */
import lineageImage from "@assets/about-lineage.webp";
import sobonfu from "@assets/teachers/sobunfu.webp";
import patriciaWalden from "@assets/teachers/patricia.webp";
import bksIyengar from "@assets/teachers/iyengar.webp";
import donnaSummerville from "@assets/teachers/donna.webp";
import annaChitty from "@assets/teachers/anna.webp";
import maryJackson from "@assets/teachers/mary.webp";
import eileenSendry from "@assets/teachers/eileen.webp";
import sharonWheeler from "@assets/teachers/sharon.webp";

// Each chain ends with Nancy; the last step is added in the markup.
const LINEAGES: { name: string; chain: string }[] = [
  { name: "Iyengar Yoga", chain: "Krishnamacharya → BKS Iyengar → Geeta & Prashant Iyengar → Patricia Walden + Stephanie Quirk" },
  { name: "Biodynamic Craniosacral Therapy", chain: "Andrew Taylor Still → William Garner Sutherland → Harold Magoun → Franklyn Sills → Anna & John Chitty (CSES) → Elizabeth Chitty Sandoval" },
  { name: "Somatic Practice and Trauma Resolution", chain: "Wilhelm Reich + Elsa Gindler → Charlotte Selver → Peter Levine (+ Porges, + Gendlin) → Kathy Kain + Steve Terrell" },
  { name: "Pre- and Perinatal Psychology", chain: "Randolph Stone → Ray Castellino → Mary Jackson + Tara Blasco" },
  { name: "Dagara Grief Ritual", chain: "Dagara people of Burkina Faso → Sobonfu Somé" },
  { name: "Wild Feminine and Holistic Pelvic Care", chain: "Tami Lynn Kent" },
  { name: "Maya Healing and Spiritual Practice", chain: "Maya healing traditions → Don Elijio Panti + Hortense Robinson → Rosita Arvigo" },
];

const TEACHERS: { name: string; image: string }[] = [
  { name: "Sobonfu Somé", image: sobonfu as string },
  { name: "Patricia Walden", image: patriciaWalden as string },
  { name: "BKS Iyengar", image: bksIyengar as string },
  { name: "Donna Summerville", image: donnaSummerville as string },
  { name: "Anna Chitty", image: annaChitty as string },
  { name: "Mary Jackson", image: maryJackson as string },
  { name: "Eileen Sendry", image: eileenSendry as string },
  { name: "Sharon Wheeler", image: sharonWheeler as string },
];

export function LineageSection() {
  return (
    <>
      <section className="ns-section" id="lineage">
        <div className="ns-split">
          <div>
            <h2>Lineage</h2>
          </div>
          <div className="ns-prose">
            <p>
              Nancy’s practice draws on lineages that connect physical, emotional, spiritual, and communal life. Her grounding in Iyengar yoga brings sustained attention to the relationship between body, breath, and awareness, while her craniosacral and somatic training emphasizes listening through touch and supporting the nervous system. Pre- and perinatal psychology informs her attention to how early experiences shape our relationships throughout life. Her study with Sobonfu Somé in the Dagara tradition of communal grief ritual, and with Rosita Arvigo in Maya healing practices, has deepened her understanding of healing as a process involving family, community, and our relationship with the sacred.
            </p>
          </div>
        </div>

        <img
          className="ns-photo ns-lineage-photo"
          src={lineageImage as string}
          alt="A candlelit altar on a wooden table between two stone-framed windows"
          width={1200}
          height={800}
          loading="lazy"
        />

        <ol className="ns-chains">
          {LINEAGES.map((lineage) => (
            <li key={lineage.name}>
              <h3>{lineage.name}</h3>
              <p className="ns-chain">
                {lineage.chain} → <b>Nancy</b>
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ns-section ns-split" id="teachers">
        <div>
          <h2>Teachers</h2>
        </div>
        <ul className="ns-teachers">
          {TEACHERS.map((teacher) => (
            <li key={teacher.name}>
              <figure>
                <img src={teacher.image} alt="" width={300} height={300} loading="lazy" />
                <figcaption>{teacher.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
