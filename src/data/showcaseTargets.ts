import { TargetData } from '../types/science';

export const SHOWCASE_TARGETS: TargetData[] = [
  {
    id: 'tp53',
    symbol: 'TP53',
    name: 'Cellular Tumor Antigen p53',
    organism: 'Homo sapiens (Human)',
    uniprotId: 'P04637',
    pdbId: '1TUP',
    provenance: 'experimental',
    resolution: '2.20 Å',
    method: 'X-ray Diffraction',
    meanPlddt: 82.4,
    sequenceLength: 393,
    description: 'The "Guardian of the Genome". Master transcriptional regulator that coordinates cell cycle arrest, DNA repair, senescence, and apoptosis in response to cellular stress and oncogenic signaling.',
    biologicalFunction: 'Binds as a homotetramer to p53 response elements in genomic DNA. Over 50% of all human cancers carry inactivating mutations in the TP53 gene, predominantly within the core DNA-binding domain.',
    sequence: 'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNTSSSPQPKKKPLDGEYFTLQIRGRERFEMFRELNEALELKDAQAGKEPGGSRAHSSHLKSKKGQSTSRHKKLMFKTEGPDSD',
    domains: [
      { id: 'TAD1', name: 'Transactivation Domain 1 (TAD1)', start: 1, end: 40, color: '#f59e0b', database: 'UniProt', description: 'Interacts with MDM2 and transcriptional coactivators p300/CBP' },
      { id: 'TAD2', name: 'Transactivation Domain 2 (TAD2)', start: 41, end: 61, color: '#fbbf24', database: 'UniProt', description: 'Acidic transactivation segment' },
      { id: 'PRD', name: 'Proline-Rich Domain (PRD)', start: 64, end: 92, color: '#10b981', database: 'UniProt', description: 'Regulates apoptotic signaling and protein stability' },
      { id: 'DBD', name: 'Core DNA-Binding Domain (DBD)', start: 102, end: 292, color: '#3b82f6', database: 'Pfam', description: 'Immunoglobulin-like beta-sandwich harboring 95% of cancer hotspot mutations' },
      { id: 'OD', name: 'Tetramerization Domain (OD)', start: 325, end: 356, color: '#8b5cf6', database: 'Pfam', description: 'Four-helix bundle driving quaternary tetramer assembly' },
      { id: 'CTD', name: 'C-Terminal Regulatory Domain', start: 363, end: 393, color: '#ec4899', database: 'UniProt', description: 'Intrinsically disordered regulatory tail with extensive PTMs' }
    ],
    activeSites: [
      { position: 176, code: 'C', role: 'Zinc Finger', description: 'Coordinates structural Zn2+ ion essential for tertiary fold' },
      { position: 179, code: 'H', role: 'Zinc Finger', description: 'Coordinates structural Zn2+ ion' },
      { position: 238, code: 'C', role: 'Zinc Finger', description: 'Coordinates structural Zn2+ ion' },
      { position: 242, code: 'C', role: 'Zinc Finger', description: 'Coordinates structural Zn2+ ion' },
      { position: 248, code: 'R', role: 'Binding', description: 'Inserts directly into DNA minor groove to form electrostatic contacts' },
      { position: 273, code: 'R', role: 'Binding', description: 'Direct contact residue interacting with DNA phosphate backbone' },
      { position: 280, code: 'R', role: 'Binding', description: 'Direct contact residue with invariant Guanine base' }
    ],
    variants: [
      { id: 'v1', mutation: 'R175H', position: 175, wildType: 'R', mutant: 'H', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Li-Fraumeni Syndrome & Pan-Cancer Hotspot', dbSnpId: 'rs28934578', clinVarId: 'VCV000012359', consequence: 'Structural disruption: distorts the zinc-binding pocket, leading to thermal instability and protein unfolding at 37°C.' },
      { id: 'v2', mutation: 'R248Q', position: 248, wildType: 'R', mutant: 'Q', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Hereditary Breast, Ovarian & Colorectal Cancer', dbSnpId: 'rs11540652', clinVarId: 'VCV000012374', consequence: 'Contact mutant: abrogates direct minor groove DNA binding without destroying overall scaffold folding.' },
      { id: 'v3', mutation: 'R273H', position: 273, wildType: 'R', mutant: 'H', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Li-Fraumeni Syndrome / Glioblastoma Hotspot', dbSnpId: 'rs28934576', clinVarId: 'VCV000012364', consequence: 'Contact mutant: eliminates critical arginine-phosphate backbone salt bridges.' },
      { id: 'v4', mutation: 'G245S', position: 245, wildType: 'G', mutant: 'S', clinicalSignificance: 'Pathogenic', reviewStars: 3, phenotype: 'Lung Adenocarcinoma & Sarcoma', dbSnpId: 'rs28934575', clinVarId: 'VCV000012368', consequence: 'Loop L3 conformational destabilization causing reduced affinity for p53 response elements.' },
      { id: 'v5', mutation: 'P72R', position: 72, wildType: 'P', mutant: 'R', clinicalSignificance: 'Benign', reviewStars: 4, phenotype: 'Common Polymorphism', dbSnpId: 'rs1042522', consequence: 'Common population polymorphism in proline-rich domain modifying apoptosis kinetics.' }
    ],
    drugs: [
      {
        name: 'Eprenetapopt (APR-246)',
        chemblId: 'CHEMBL3707345',
        pubchemCid: 11525624,
        smiles: 'CC1(C(=O)N2CCC1CC2)CO',
        molecularFormula: 'C9H15NO2',
        molecularWeight: 169.22,
        maxPhase: 3,
        mechanismOfAction: 'Pro-drug converted into methylene quinuclidinone (MQ) which covalently alkylates mutant p53 cysteine residues (C124, C182, C277), thermodynamically refolding p53 to restore wild-type transcriptional activity.',
        indication: 'Myelodysplastic Syndromes (MDS) and Acute Myeloid Leukemia (AML) with TP53 mutation',
        xLogP: -0.4,
        tpsa: 32.7,
        hbd: 1,
        hba: 2,
        rotatableBonds: 1
      },
      {
        name: 'Nutlin-3a',
        chemblId: 'CHEMBL522303',
        pubchemCid: 11433190,
        smiles: 'CC(C)OC1=C(C=C(C=C1)Cl)C2=NC(C(N2C(=O)N3CCN(CC3)C(=O)C)C4=CC=C(C=C4)Cl)C5=CC=C(C=C5)Cl',
        molecularFormula: 'C30H30Cl2N4O4',
        molecularWeight: 581.5,
        maxPhase: 1,
        mechanismOfAction: 'Small-molecule MDM2 antagonist that mimics the Leu26, Trp23, and Phe19 triad of p53, preventing MDM2-mediated p53 ubiquitination and degradation.',
        indication: 'TP53 wild-type malignancies (Liposarcoma, AML)',
        xLogP: 4.6,
        tpsa: 75.3,
        hbd: 0,
        hba: 5,
        rotatableBonds: 5
      }
    ],
    chemblActivities: [
      { moleculeChemblId: 'CHEMBL3707345', moleculeName: 'APR-246', standardType: 'IC50', standardValue: 12000, standardUnits: 'nM', pChemblValue: 4.92, targetChemblId: 'CHEMBL4096' },
      { moleculeChemblId: 'CHEMBL522303', moleculeName: 'Nutlin-3a', standardType: 'IC50', standardValue: 90, standardUnits: 'nM', pChemblValue: 7.05, targetChemblId: 'CHEMBL4096' },
      { moleculeChemblId: 'CHEMBL2178204', moleculeName: 'Idasanutlin (RG7388)', standardType: 'Ki', standardValue: 6, standardUnits: 'nM', pChemblValue: 8.22, targetChemblId: 'CHEMBL4096' }
    ]
  },
  {
    id: 'abl1',
    symbol: 'ABL1',
    name: 'Tyrosine-Protein Kinase ABL1',
    organism: 'Homo sapiens (Human)',
    uniprotId: 'P00520',
    pdbId: '1IEP',
    provenance: 'experimental',
    resolution: '2.10 Å',
    method: 'X-ray Diffraction',
    meanPlddt: 87.6,
    sequenceLength: 1130,
    description: 'Proto-oncogene non-receptor tyrosine kinase. Chromosomal translocation t(9;22)(q34;q11) produces the constitutively active BCR-ABL1 fusion oncoprotein (Philadelphia chromosome), the causal driver of Chronic Myeloid Leukemia (CML).',
    biologicalFunction: 'Functions in cell growth, survival, oxidative stress response, and cytoskeletal remodeling. The landmark structural co-crystal of ABL1 with Imatinib (PDB 1IEP) demonstrated the inactive DFG-out conformation.',
    sequence: 'MLEICLKLVGCKSKKGLSSSSSCYLEEALQRPVASDFEPQGLSEAARWNSKENLLAGPSENDPNLFVALYDFVASGDNTLSITKGEKLRVLGYNHNGEWCEAQTKNGQGWVPSNYITPVNSLEKHSWYHGPVSRNAAEYLLSSGINGSFLVRESESSPGQRSISLRYEGRVYHYRINTASDGKLYVSSESRFNTLAELVHHHSTVADGLITTLHYPAPKRNKPTVYGVSPNYDKWEMERTDITMKHKLGGGQYGEVYEGVWKKYSLTVAVKTLKEDTMEVEEFLKEAAVMKEIKHPNLVQLLGVCTREPPFYIITEFMTYGNLLDYLRECNRQEVNAVVLLYMATQISSAMEYLEKKNFIHRDLAARNCLVGENHLVKVADFGLSRLMTGDTYTAHAGAKFPIKWTAPESLAYNKFSIKSDVWAFGVLLWEIATYGMSPYPGIDLSQVYELLEKDYRMERPEGCPEKVYELMRACWQWNPSDRPSFAEIHQAFETMFQESSISDEVEKELGKQGVRGAVSTLLQAPELPTKTRTSRRAAEHRDTTDVPEMPHSKGQGESDPLDHEPAVSPLLPRKERGPPEGGLNEDERLLPKDKKTNLFSALIKKKKKTAPTPPKRSSSFREMDGQPERRGAGEEEGRDISNGALAFTPLDTADPAKSPKPSNGAGVPNGALRESGGSGFRSPHLWKKSSTLTSSRLATGEEEGGGSSSKRFLRSCSASCVPHGAKDTEWRSVTLPRDLQSTGRQFDSSTFGGHKSEKPALPRKRAGENRSDQVTRGTVTPPPRLVKKNEEAADEVFKDIMESSPGSSPPNLTPKPLRRQVTVAPASGLPHKEEAGKGSALGTPAAAEPVTPTSKAGSGAPGGTSKGPAEESRVRRHKHSSESPGRDKGKLSRLKPAPPPPPAASAGKAGGKPSQSPSQEAAGEAVLGAKTKATSLVDAVNSDAAKPSQPAEGLKKPVLPATPKPQSAKPSGTPISPAPVPSTLPSASSALAGDQPSSTAFIPLISTRVSLRKTRQPPERIASGAITKGVVLDSTEALCLAISRNSEQMASHSAVLEAGKNLYTFCVSYVDSIQQMRNKFAFREAINKLENNLRELQICPATAGSGPAATQDFSKLLSSVKEISDIVQR',
    domains: [
      { id: 'SH3', name: 'Src Homology 3 (SH3) Domain', start: 65, end: 121, color: '#f59e0b', database: 'Pfam', description: 'Binds proline-rich ligands; participates in autoinhibitory assembly' },
      { id: 'SH2', name: 'Src Homology 2 (SH2) Domain', start: 127, end: 217, color: '#10b981', database: 'Pfam', description: 'Phosphotyrosine recognition module' },
      { id: 'Kinase', name: 'Protein Kinase Catalytic Domain', start: 242, end: 493, color: '#3b82f6', database: 'Pfam', description: 'Bivertebrate kinase lobe harboring the ATP-binding cleft, gatekeeper residue, and DFG motif' }
    ],
    activeSites: [
      { position: 271, code: 'K', role: 'Catalytic', description: 'Conserved catalytic lysine coordinating alpha- and beta-phosphates of ATP' },
      { position: 286, code: 'E', role: 'Catalytic', description: 'Conserved alphaC-helix glutamate forming catalytic salt bridge' },
      { position: 315, code: 'T', role: 'Gatekeeper', description: 'Gatekeeper residue controlling access to deep hydrophobic back pocket' },
      { position: 318, code: 'M', role: 'Hinge', description: 'Hinge residue forming essential backbone hydrogen bonds with inhibitors' },
      { position: 381, code: 'D', role: 'Binding', description: 'Aspartate of the canonical DFG motif; points outward in DFG-out inactive conformation' }
    ],
    variants: [
      { id: 'v1', mutation: 'T315I', position: 315, wildType: 'T', mutant: 'I', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Pan-TKI Resistance in CML & Ph+ ALL', dbSnpId: 'rs121913459', clinVarId: 'VCV000013586', consequence: 'Gatekeeper mutation: bulky isoleucine sidechain creates severe steric clash preventing Imatinib, Nilotinib, Dasatinib, and Bosutinib binding.' },
      { id: 'v2', mutation: 'E255K', position: 255, wildType: 'E', mutant: 'K', clinicalSignificance: 'Pathogenic', reviewStars: 3, phenotype: 'Imatinib & Dasatinib Resistance', dbSnpId: 'rs121913460', consequence: 'P-loop ATP-binding mutation altering conformational flexibility and lowering inhibitor affinity.' },
      { id: 'v3', mutation: 'Y253H', position: 253, wildType: 'Y', mutant: 'H', clinicalSignificance: 'Pathogenic', reviewStars: 3, phenotype: 'Imatinib Resistance', dbSnpId: 'rs121913461', consequence: 'Disrupts the closed P-loop architecture required for high-affinity Imatinib accommodation.' }
    ],
    drugs: [
      {
        name: 'Imatinib (Gleevec)',
        chemblId: 'CHEMBL941',
        pubchemCid: 5291,
        smiles: 'CC1=C(C=C(C=C1)NC(=O)C2=CC=C(C=C2)CN3CCN(CC3)C)NC4=NC=CC(=N4)C5=CN=CC=C5',
        molecularFormula: 'C29H31N7O',
        molecularWeight: 493.6,
        maxPhase: 4,
        indication: 'Philadelphia chromosome-positive Chronic Myeloid Leukemia (CML) and GIST',
        mechanismOfAction: 'Selective competitive inhibitor binding to the inactive DFG-out conformation of ABL1 kinase domain, preventing ATP binding and substrate autophosphorylation.',
        xLogP: 3.5,
        tpsa: 86.3,
        hbd: 2,
        hba: 7,
        rotatableBonds: 7
      },
      {
        name: 'Ponatinib (Iclusig)',
        chemblId: 'CHEMBL1171837',
        pubchemCid: 24826799,
        smiles: 'CC1=C(C=C(C=C1)C#CC2=CN=C3N2N=CC=C3)NC(=O)C4=CC(=C(C=C4)CN5CCN(CC5)C)C(F)(F)F',
        molecularFormula: 'C29H27F3N6O',
        molecularWeight: 532.6,
        maxPhase: 4,
        indication: 'CML and Ph+ ALL harboring the refractory T315I gatekeeper mutation',
        mechanismOfAction: 'Third-generation TKI engineered with a linear ethynyl (carbon-carbon triple bond) linker that spans the bulky isoleucine-315 sidechain without steric clash.',
        xLogP: 4.1,
        tpsa: 75.9,
        hbd: 1,
        hba: 6,
        rotatableBonds: 5
      },
      {
        name: 'Asciminib (Scemblix)',
        chemblId: 'CHEMBL4297585',
        pubchemCid: 118701449,
        smiles: 'C1CC(C1)(C2=CC=C(C=C2)NC(=O)C3=CN=C(C(=N3)Cl)NC4=CC=C(C(=C4)O)C(=O)N)O',
        molecularFormula: 'C20H18ClN5O3',
        molecularWeight: 411.8,
        maxPhase: 4,
        indication: 'Ph+ CML previously treated with >= 2 TKIs or with T315I mutation',
        mechanismOfAction: 'First-in-class allosteric STAMP inhibitor (Specifically Targeting the ABL Myristoyl Pocket), locking ABL1 in its autoinhibited state.',
        xLogP: 2.8,
        tpsa: 110.1,
        hbd: 4,
        hba: 5,
        rotatableBonds: 4
      }
    ],
    chemblActivities: [
      { moleculeChemblId: 'CHEMBL941', moleculeName: 'Imatinib', standardType: 'IC50', standardValue: 38, standardUnits: 'nM', pChemblValue: 7.42, targetChemblId: 'CHEMBL1862' },
      { moleculeChemblId: 'CHEMBL1171837', moleculeName: 'Ponatinib', standardType: 'IC50', standardValue: 0.37, standardUnits: 'nM', pChemblValue: 9.43, targetChemblId: 'CHEMBL1862' },
      { moleculeChemblId: 'CHEMBL4297585', moleculeName: 'Asciminib', standardType: 'Kd', standardValue: 0.8, standardUnits: 'nM', pChemblValue: 9.10, targetChemblId: 'CHEMBL1862' }
    ]
  },
  {
    id: 'egfr',
    symbol: 'EGFR',
    name: 'Epidermal Growth Factor Receptor',
    organism: 'Homo sapiens (Human)',
    uniprotId: 'P00533',
    pdbId: '2GS6',
    provenance: 'experimental',
    resolution: '2.60 Å',
    method: 'X-ray Diffraction',
    meanPlddt: 85.1,
    sequenceLength: 1210,
    description: 'Transmembrane receptor tyrosine kinase belonging to the ErbB family. Essential for epithelial cell proliferation, survival, and tissue homeostasis. Somatic activating mutations in non-small cell lung cancer (NSCLC) drive oncogenic signaling.',
    biologicalFunction: 'Ligand binding (EGF, TGF-alpha) induces asymmetric dimer formation where the C-lobe of one kinase monomer acts as an allosteric activator for the adjacent N-lobe.',
    sequence: 'MRPSGTAGAALLALLAALCPASRALEEKKVCQGTSNKLTQLGTFEDHFLSLQRMFNNCEVVLGNLEITYVQRNYDLSFLKTIQEVAGYVLIALNTVERIPLENLQIIRGNMYYENSYALAVLSNYDANKTGLKELPMRNLQEILHGAVRFSNNPALCNVESIQWRDIVSSDFLSNMSMDFQNHLGSCQKCDPSCPNGSCWGAGEENCQKLTKIICAQQCSGRCRGKSPSDCCHNQCAAGCTGPRESDCLVCRKFRDEATCKDTCPPLMLYNPTTYQMDVNPEGKYSFGATCVKKCPRNYVVTDHGSCVRACGADSYEMEEDGVRKCKKCEGPCRKVCNGIGIGEFKDSLSINATNIKHFKNCTSISGDLHILPVAFRGDSFTHTPPLDPQELDILKTVKEITGFLLIQAWPENRTDLHAFENLEIIRGRTKQHGQFSLAVVSLNITSLGLRSLKEISDGDVIISGNKNLCYANTINWKKLFGTSGQKTKIISNRGENSCKATGQVCHALCSPEGCWGPEPRDCVSCRNVSRGRECVDKCNLLEGEPREFVENSECIQCHPECLPQAMNITCTGRGPDNCIQCAHYIDGPHCVKTCPAGVMGENNTLVWKYADAGHVCHLCHPNCTYGCTGPGLEGCPTNGPKIPSIATGMVGALLLLLVVALGIGLFMRRRHIVRKRTLRRLLQERELVEPLTPSGEAPNQALLRILKETEFKKIKVLGSGAFGTVYKGLWIPEGEKVKIPVAIKELREATSPKANKEILDEAYVMASVDNPHVCRLLGICLTSTVQLITQLMPFGCLLDYVREHKDNIGSQYLLNWCVQIAKGMNYLEDRRLVHRDLAARNVLVKTPQHVKITDFGLAKLLGAEEKEYHAEGGKVPIKWMALESILHRIYTHQSDVWSYGVTVWELMTFGSKPYDGIPASEISSILEKGERLPQPPICTIDVYMIMVKCWMIDADSRPKFRELIIEFSKMARDPQRYLVIQGDERMHLPSPTDSNFYRALMDEEDMDDVVDADEYLIPQQGFFSSPSTSRTPLLSSLSATSNNSTVACIDRNGLQSCPIKEDSFLQRYSSDPTGALTEDSIDDTFLPVPEYINQSVPKRPAGSVQNPVYHNQPLNPAPSRDPHYQDPHSTAVGNPEYLNTVQPTCVNSTFDSPAHWAQKGSHQISLDNPDYQQDFFPKEAKPNGIFKGSTAENAEYLRVAPQSSEFIGA',
    domains: [
      { id: 'Extracellular', name: 'Extracellular Ligand-Binding Domain (I-IV)', start: 25, end: 645, color: '#f59e0b', database: 'UniProt', description: 'Receptor L and furin-like domains mediating EGF binding and dimerization arm exposure' },
      { id: 'TM', name: 'Transmembrane Helix', start: 646, end: 668, color: '#10b981', database: 'UniProt', description: 'Single-pass alpha-helix transmitting dimerization signal' },
      { id: 'Kinase', name: 'Tyrosine Kinase Catalytic Domain', start: 712, end: 979, color: '#3b82f6', database: 'Pfam', description: 'ATP cleft where gefitinib, erlotinib, and osimertinib bind' }
    ],
    activeSites: [
      { position: 745, code: 'K', role: 'Catalytic', description: 'ATP alpha/beta phosphate coordinating lysine' },
      { position: 790, code: 'T', role: 'Gatekeeper', description: 'Gatekeeper threonine residue regulating access to back hydrophobic pocket' },
      { position: 797, code: 'C', role: 'Binding', description: 'Non-catalytic cysteine covalently targeted by third-generation irreversible TKIs (Osimertinib)' },
      { position: 855, code: 'D', role: 'Catalytic', description: 'Aspartate of conserved DFG loop coordinating catalytic Mg2+' }
    ],
    variants: [
      { id: 'v1', mutation: 'L858R', position: 858, wildType: 'L', mutant: 'R', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'NSCLC Activating Driver Mutation', dbSnpId: 'rs121434568', clinVarId: 'VCV000016613', consequence: 'Disrupts auto-inhibitory hydrophobic interactions in the activation loop, constitutively activating kinase activity.' },
      { id: 'v2', mutation: 'T790M', position: 790, wildType: 'T', mutant: 'M', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Acquired 1st/2nd Gen TKI Resistance in NSCLC', dbSnpId: 'rs121434569', clinVarId: 'VCV000016610', consequence: 'Gatekeeper mutation: bulky methionine increases ATP binding affinity 20-fold while sterically hindering gefitinib/erlotinib.' },
      { id: 'v3', mutation: 'C797S', position: 797, wildType: 'C', mutant: 'S', clinicalSignificance: 'Pathogenic', reviewStars: 3, phenotype: 'Acquired 3rd Gen (Osimertinib) Resistance', dbSnpId: 'rs796053229', consequence: 'Abolishes nucleophilic thiol group required for covalent Michael addition with Osimertinib acrylamide warhead.' }
    ],
    drugs: [
      {
        name: 'Osimertinib (Tagrisso)',
        chemblId: 'CHEMBL3353410',
        pubchemCid: 71496458,
        smiles: 'CC#CC(=O)NC1=C(C=C(C(=C1)NC2=NC=CC(=N2)C3=CN(C4=CC=CC=C34)C)N(C)CCN(C)C)OC',
        molecularFormula: 'C28H33N7O2',
        molecularWeight: 499.6,
        maxPhase: 4,
        indication: 'First-line and metastatic EGFR-mutated (L858R, Exon19del, T790M) NSCLC',
        mechanismOfAction: 'Third-generation irreversible kinase inhibitor that forms a covalent bond with Cys797 at the edge of the ATP-binding pocket, overcoming T790M gatekeeper resistance.',
        xLogP: 3.1,
        tpsa: 72.8,
        hbd: 2,
        hba: 7,
        rotatableBonds: 6
      },
      {
        name: 'Gefitinib (Iressa)',
        chemblId: 'CHEMBL939',
        pubchemCid: 123631,
        smiles: 'COC1=C(C=C2C(=C1)N=CN=C2NC3=CC(=C(C=C3)F)Cl)OCCCN4CCOCC4',
        molecularFormula: 'C22H24ClFN4O3',
        molecularWeight: 446.9,
        maxPhase: 4,
        indication: 'EGFR exon 19 deletions or L858R substitution NSCLC',
        mechanismOfAction: 'First-generation reversible ATP-competitive 4-anilinoquinazoline inhibitor.',
        xLogP: 3.2,
        tpsa: 68.7,
        hbd: 1,
        hba: 6,
        rotatableBonds: 7
      }
    ],
    chemblActivities: [
      { moleculeChemblId: 'CHEMBL3353410', moleculeName: 'Osimertinib', standardType: 'IC50', standardValue: 1.2, standardUnits: 'nM', pChemblValue: 8.92, targetChemblId: 'CHEMBL203' },
      { moleculeChemblId: 'CHEMBL939', moleculeName: 'Gefitinib', standardType: 'IC50', standardValue: 3.3, standardUnits: 'nM', pChemblValue: 8.48, targetChemblId: 'CHEMBL203' }
    ]
  },
  {
    id: 'sars-cov-2-rbd',
    symbol: 'SARS-CoV-2 RBD / ACE2',
    name: 'Spike Glycoprotein RBD complexed with Human ACE2',
    organism: 'SARS-CoV-2 / Homo sapiens',
    uniprotId: 'P0DTC2',
    pdbId: '6M0J',
    provenance: 'experimental',
    resolution: '2.45 Å',
    method: 'X-ray Diffraction',
    meanPlddt: 91.2,
    sequenceLength: 223,
    description: 'High-resolution co-crystal structure of the SARS-CoV-2 Spike Receptor-Binding Domain (RBD) engaged with the human Angiotensin-Converting Enzyme 2 (ACE2) ectodomain, deciphering the molecular entry portal of the COVID-19 pandemic.',
    biologicalFunction: 'The Spike RBD undergoes hinge-like conformational switching between "down" (immune-evasive) and "up" (receptor-accessible) states to dock onto the N-terminal alpha-helix of ACE2.',
    sequence: 'RVQPTESIVRFPNITNLCPFGEVFNATRFASVYAWNRKRISNCVADYSVLYNSASFSTFKCYGVSPTKLNDLCFTNVYADSFVIRGDEVRQIAPGQTGKIADYNYKLPDDFTGCVIAWNSNNLDSKVGGNYNYLYRLFRKSNLKPFERDISTEIYQAGSTPCNGVEGFNCYFPLQSYGFQPTNGVGYQPYRVVVLSFELLHAPATVCGPKKSTNLVKNKCVNF',
    domains: [
      { id: 'RBM', name: 'Receptor-Binding Motif (RBM)', start: 438, end: 506, color: '#ef4444', database: 'UniProt', description: 'Extended loop presenting the contact residues that dock directly into the ACE2 hydrophobic trench' },
      { id: 'Core', name: 'RBD Core Subdomain', start: 333, end: 437, color: '#3b82f6', database: 'Pfam', description: 'Five-stranded antiparallel beta-sheet stabilized by three disulfide bonds' }
    ],
    activeSites: [
      { position: 486, code: 'F', role: 'Binding', description: 'Hydrophobic anchor inserting into the Met82/Tyr83 hydrophobic pocket of ACE2' },
      { position: 493, code: 'Q', role: 'Binding', description: 'Forms polar contacts with ACE2 Lys31' },
      { position: 501, code: 'N', role: 'Binding', description: 'Forms critical hydrogen bond and pi-pi stacking with ACE2 Tyr41 and Lys353' },
      { position: 505, code: 'Y', role: 'Binding', description: 'Stabilizes the salt bridge network around ACE2 Lys353-Asp38' }
    ],
    variants: [
      { id: 'v1', mutation: 'N501Y', position: 501, wildType: 'N', mutant: 'Y', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Alpha, Beta, Gamma, Omicron Variants', consequence: 'Introduces aromatic pi-pi stacking with ACE2 Tyr41, boosting binding affinity roughly 10-fold and increasing viral transmission.' },
      { id: 'v2', mutation: 'E484K', position: 484, wildType: 'E', mutant: 'K', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Beta & Gamma Immune Escape ("Eeek" mutation)', consequence: 'Flips charge from negative to positive, disrupting neutralization by class 2 convalescent antibodies.' }
    ],
    drugs: [
      {
        name: 'Nirmatrelvir (Paxlovid)',
        chemblId: 'CHEMBL4801128',
        pubchemCid: 155903259,
        smiles: 'CC(C)(C)C1=CC(=O)N(C1)C(=O)C(C(C)(C)C)NC(=O)C(F)(F)Cl',
        molecularFormula: 'C23H32F3N5O4',
        molecularWeight: 499.5,
        maxPhase: 4,
        indication: 'Mild-to-moderate COVID-19 in patients at high risk of progression to severe disease',
        mechanismOfAction: 'Potent SARS-CoV-2 main protease (Mpro / 3CLpro) inhibitor halting viral replication downstream of host entry.',
        xLogP: 1.8,
        tpsa: 104.5,
        hbd: 3,
        hba: 5,
        rotatableBonds: 6
      }
    ],
    chemblActivities: [
      { moleculeChemblId: 'CHEMBL4801128', moleculeName: 'Nirmatrelvir', standardType: 'Ki', standardValue: 3.1, standardUnits: 'nM', pChemblValue: 8.51, targetChemblId: 'CHEMBL4303835' }
    ]
  },
  {
    id: 'crispr-cas9',
    symbol: 'CRISPR-Cas9',
    name: 'CRISPR-Associated Endonuclease Cas9',
    organism: 'Streptococcus pyogenes',
    uniprotId: 'Q99ZW2',
    pdbId: '4UN3',
    provenance: 'experimental',
    resolution: '2.58 Å',
    method: 'X-ray Diffraction',
    meanPlddt: 89.4,
    sequenceLength: 1368,
    description: 'Bacterial adaptive immunity RNA-guided DNA endonuclease that ushered in the modern genome editing revolution (Nobel Prize in Chemistry 2020). Complexes with a single-guide RNA (sgRNA) to interrogate genomic DNA for 5\'-NGG protospacer adjacent motifs (PAM).',
    biologicalFunction: 'Upon PAM recognition and R-loop strand invasion, Cas9 employs two catalytic nuclease domains: RuvC cleaves the non-target DNA strand, and HNH cleaves the target strand 3 base pairs upstream of the PAM, generating blunt double-strand breaks.',
    sequence: 'MDKKYSIGLDIGTNSVGWAVITDEYKVPSKKFKVLGNTDRHSIKKNLIGALLFDSGETAEATRLKRTARRRYTRRKNRICYLQEIFSNEMAKVDDSFFHRLEESFLVEEDKKHERHPIFGNIVDEVAYHEKYPTIYHLRKKLVDSTDKADLRLIYLALAHMIKFRGHFLIEGDLNPDNSDVDKLFIQLVQTYNQLFEENPINASGVDAKAILSARLSKSRRLENLIAQLPGEKKNGLFGNLIALSLGLTPNFKSNFDLAEDAKLQLSKDTYDDDLDNLLAQIGDQYADLFLAAKNLSDAILLSDILRVNTEITKAPLSASMIKRYDEHHQDLTLLKALVRQQLPEKYKEIFFDQSKNGYAGYIDGGASQEEFYKFIKPILEKMDGTEELLVKLNREDLLRKQRTFDNGSIPHQIHLGELHAILRRQEDFYPFLKDNREKIEKILTFRIPYYVGPLARGNSRFAWMTRKSEETITPWNFEEVVDKGASAQSFIERMTNFDKNLPNEKVLPKHSLLYEYFTVYNELTKVKYVTEGMRKPAFLSGEQKKAIVDLLFKTNRKVTVKQLKEDYFKKIECFDSVEISGVEDRFNASLGTYHDLLKIIKDKDFLDNEENEDILEDIVLTLTLFEDREMIEERLKTYAHLFDDKVMKQLKRRRYTGWGRLSRKLINGIRDKQSGKTILDFLKSDGFANRNFMQLIHDDSLTFKEDIQKAQVSGQGDSLHEHIANLAGSPAIKKGILQTVKVVDELVKVMGRHKPENIVIEMARENQTTQKGQKNSRERMKRIEEGIKELGSQILKEHPVENTQLQNEKLYLYYLQNGRDMYVDQELDINRLSDYDVDHIVPQSFLKDDSIDNKVLTRSDKNRGKSDNVPSEEVVKKMKNYWRQLLNAKLITQRKFDNLTKAERGGLSELDKAGFIKRQLVETRQITKHVAQILDSRMNTKYDENDKLIREVKVITLKSKLVSDFRKDFQFYKVREINNYHHAHDAYLNAVVGTALIKKYPKLESEFVYGDYKVYDVRKMIAKSEQEIGKATAKYFFYSNIMNFFKTEITLANGEIRKRPLIETNGETGEIVWDKGRDFATVRKVLSMPQVNIVKKTEVQTGGFSKESILPKRNSDKLIARKKDWDPKKYGGFDSPTVAYSVLVVAKVEKGKSKKLKSVKELLGITIMERSSFEKNPIDFLEAKGYKEVKKDLIIKLPKYSLFELENGRKRMLASAGELQKGNELALPSKYVNFLYLASHYEKLKGSPEDNEQKQLFVEQHKHYLDEIIEQISEFSKRVILADANLDKVLSAYNKHRDKPIREQAENIIHLFTLTNLGAPAAFKYFDTTIDRKRYTSTKEVLDATLIHQSITGLYETRIDLSQLGGD',
    domains: [
      { id: 'REC', name: 'Recognition (REC) Lobe', start: 60, end: 718, color: '#3b82f6', database: 'UniProt', description: 'Binds sgRNA:target DNA heteroduplex and drives allosteric activation' },
      { id: 'HNH', name: 'HNH Nuclease Domain', start: 775, end: 908, color: '#ef4444', database: 'UniProt', description: 'Cleaves target DNA strand complementary to guide RNA' },
      { id: 'RuvC', name: 'RuvC Nuclease Domain', start: 909, end: 1099, color: '#10b981', database: 'UniProt', description: 'Cleaves non-target DNA strand' },
      { id: 'PAM', name: 'PAM-Interacting (PI) Domain', start: 1099, end: 1368, color: '#f59e0b', database: 'UniProt', description: 'Interrogates major and minor grooves to recognize 5\'-NGG PAM motif' }
    ],
    activeSites: [
      { position: 10, code: 'D', role: 'Catalytic', description: 'RuvC catalytic carboxylate (D10A mutation produces Cas9 nickase)' },
      { position: 840, code: 'H', role: 'Catalytic', description: 'HNH catalytic histidine (H840A mutation produces Cas9 nickase; D10A+H840A produces dCas9)' }
    ],
    variants: [
      { id: 'v1', mutation: 'D10A', position: 10, wildType: 'D', mutant: 'A', clinicalSignificance: 'Likely Benign', reviewStars: 4, phenotype: 'Engineered Cas9 Nickase (nCas9)', consequence: 'Inactivates RuvC nuclease; cleaves only target strand, widely used for prime editing and high-fidelity base editing.' },
      { id: 'v2', mutation: 'H840A', position: 840, wildType: 'H', mutant: 'A', clinicalSignificance: 'Likely Benign', reviewStars: 4, phenotype: 'Engineered Nickase & Dead Cas9 (dCas9)', consequence: 'Inactivates HNH nuclease; paired with D10A creates catalytically inactive dCas9 for CRISPRi and epigenetic editing.' }
    ],
    drugs: [
      {
        name: 'Casgevy (Exagamglogene autotemcel)',
        smiles: 'RNA-guided therapeutic gene editing system targeting BCL11A erythroid enhancer',
        molecularFormula: 'CRISPR-Cas9 RNP Complex',
        molecularWeight: 158400,
        maxPhase: 4,
        indication: 'Sickle Cell Disease (SCD) and Transfusion-Dependent Beta-Thalassemia (TDT)',
        mechanismOfAction: 'First FDA/EMA-approved CRISPR therapy. Patient CD34+ hematopoietic stem cells are edited ex vivo to disrupt the BCL11A erythroid enhancer, reactivating fetal hemoglobin (HbF) production to prevent vaso-occlusive crises.'
      }
    ],
    chemblActivities: []
  },
  {
    id: 'hemoglobin',
    symbol: 'HBB / HBA',
    name: 'Deoxyhemoglobin Heterotetramer',
    organism: 'Homo sapiens (Human)',
    uniprotId: 'P68871',
    pdbId: '4HHB',
    provenance: 'experimental',
    resolution: '1.74 Å',
    method: 'X-ray Diffraction',
    meanPlddt: 95.8,
    sequenceLength: 147,
    description: 'The prototypical allosteric protein and oxygen transport vehicle. Tetrameric assembly of two alpha and two beta globin chains with protoheme IX prosthetic groups coordinating Fe2+ ions.',
    biologicalFunction: 'Cooperatively binds molecular oxygen, switching from the low-affinity T (tense, deoxygenated) state to the high-affinity R (relaxed, oxygenated) state through quaternary rotation.',
    sequence: 'MVHLTPEEKSAVTALWGKVNVDEVGGEALGRLLVVYPWTQRFFESFGDLSTPDAVMGNPKVKAHGKKVLGAFSDGLAHLDNLKGTFATLSELHCDKLHVDPENFRLLGNVLVCVLAHHFGKEFTPPVQAAYQKVVAGVANALAHKYH',
    domains: [
      { id: 'Globin', name: 'Globin Fold', start: 1, end: 146, color: '#3b82f6', database: 'Pfam', description: 'Eight canonical alpha-helices (A through H) enclosing the hydrophobic heme pocket' }
    ],
    activeSites: [
      { position: 58, code: 'H', role: 'Binding', description: 'Distal histidine (His58) stabilizing coordinated O2 via hydrogen bonding' },
      { position: 87, code: 'H', role: 'Catalytic', description: 'Proximal histidine (His87) coordinating heme iron directly' }
    ],
    variants: [
      { id: 'v1', mutation: 'E6V', position: 6, wildType: 'E', mutant: 'V', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Sickle Cell Disease (HbS)', dbSnpId: 'rs334', clinVarId: 'VCV000015147', consequence: 'Replaces hydrophilic glutamate with hydrophobic valine on beta-chain surface. In deoxygenated T-state, Val6 docks into a hydrophobic pocket on an adjacent tetramer, inducing polymer fiber crystallization and erythrocyte sickling.' }
    ],
    drugs: [
      {
        name: 'Voxelotor (Oxbryta)',
        chemblId: 'CHEMBL3989871',
        pubchemCid: 72935294,
        smiles: 'CC1=C(C=CC(=C1)C2=NC(=NO2)C)OCC3=C(C=CC=C3O)C=O',
        molecularFormula: 'C19H19N3O3',
        molecularWeight: 337.4,
        maxPhase: 4,
        indication: 'Sickle Cell Disease in adults and pediatric patients >= 4 years',
        mechanismOfAction: 'First-in-class HbS polymerization inhibitor. Reversibly binds to N-terminal valines of hemoglobin alpha-chains via Schiff base, stabilizing the oxygenated R-state and preventing polymerization.',
        xLogP: 2.7,
        tpsa: 78.4,
        hbd: 1,
        hba: 5,
        rotatableBonds: 4
      }
    ],
    chemblActivities: [
      { moleculeChemblId: 'CHEMBL3989871', moleculeName: 'Voxelotor', standardType: 'EC50', standardValue: 4200, standardUnits: 'nM', pChemblValue: 5.38, targetChemblId: 'CHEMBL2095191' }
    ]
  },
  {
    id: 'pcsk9',
    symbol: 'PCSK9',
    name: 'Proprotein Convertase Subtilisin/Kexin Type 9',
    organism: 'Homo sapiens (Human)',
    uniprotId: 'Q8NBP7',
    pdbId: '2P4E',
    provenance: 'experimental',
    resolution: '1.98 Å',
    method: 'X-ray Diffraction',
    meanPlddt: 88.5,
    sequenceLength: 692,
    description: 'Post-translational regulator of plasma cholesterol homeostasis. Binds to the epidermal growth factor-like repeat A (EGF-A) domain of the low-density lipoprotein receptor (LDLR), escorting it to lysosomal destruction.',
    biologicalFunction: 'Loss-of-function natural mutations confer lifelong 40-80% reductions in LDL cholesterol and dramatically protect against coronary heart disease with zero detrimental phenotype.',
    sequence: 'MGTVSSRRSWWPLPLLLLLLLLLGPAGARAQEDEDGDYEELVLALRSEEDGLAEAPEHGTTATFHRCAKDPWRLPGTYVVVLKEETHLSQSERTARRLQAQAARRGYLTKILHVFHGLLPGFLVKMSGDLLELALKLPHVDYIEEDSSVFAQSIPWNLERITPPRYRADEEYPPDGGSLVEVYLLDTSIQSDHREIEGRVMVTDFENVPEEDGTRFHRQASKCDSHGTHLAGVVSGRDAGVAKGASMRSLRVLNCQGKGTVSGTLIGLEFIRKSQLVQPVGPLVVLLPLAGGYSRVLNAACQRLARAGVVLVTAAGNFRDDACLYSPASAPEVITVGATNAQDQPVTLGTLGTNFGRCVDLFAPGEDIIGASSDCSTCFVSQSGTSQAAAHVAGIAAMMLSAEPELTLAELRQRLIHFSAKDVINEAWFPEDQRVLTPNLVAALPPSTHGAGWQLFCRTVWSAHSGPTRMATAVARCAPDEELLSCSSFSRSGKRRGERMEAQGGKLVCRAHNAFGGEGVYAIARCCLLPQANCSVHTAPPAEASMGTRVHCHQQGHVLTGCSSHWEVEDLGTHKPPVLRPRGQPNQCVGHREASIHASCCHAPGLECKVKEHGIPAPQEQVTVACEEGWTLTGCSALPGTSHVLGAYAVDNTCVVRSRDVSTTGSTSEEAVTAVAICCRSRHLAQASQELQ',
    domains: [
      { id: 'Prodomain', name: 'Prodomain (Inhibitory)', start: 31, end: 152, color: '#f59e0b', database: 'UniProt', description: 'Cleaved autocatalytically but remains tightly bound, occluding active site' },
      { id: 'Catalytic', name: 'Subtilisin-like Catalytic Domain', start: 153, end: 421, color: '#3b82f6', database: 'Pfam', description: 'Presents the shallow hydrophobic face that interacts with LDLR EGF-A domain' },
      { id: 'C-term', name: 'C-Terminal Cysteine-Rich Domain', start: 456, end: 692, color: '#10b981', database: 'UniProt', description: 'Three tandem modular repeats required for LDLR internalization' }
    ],
    activeSites: [
      { position: 186, code: 'D', role: 'Catalytic', description: 'Catalytic triad aspartate' },
      { position: 226, code: 'H', role: 'Catalytic', description: 'Catalytic triad histidine' },
      { position: 386, code: 'S', role: 'Catalytic', description: 'Catalytic triad nucleophilic serine' }
    ],
    variants: [
      { id: 'v1', mutation: 'D374Y', position: 374, wildType: 'D', mutant: 'Y', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Severe Autosomal Dominant Familial Hypercholesterolemia', dbSnpId: 'rs121908064', clinVarId: 'VCV000018151', consequence: 'Gain-of-function mutation: increases binding affinity for LDLR over 25-fold at endosomal pH, depleting cell-surface LDLR.' },
      { id: 'v2', mutation: 'R46L', position: 46, wildType: 'R', mutant: 'L', clinicalSignificance: 'Benign', reviewStars: 4, phenotype: 'Cardioprotective Loss-of-Function', dbSnpId: 'rs11591147', consequence: 'Loss-of-function polymorphism associated with ~15-20% reduction in circulating LDL-C and 47% reduction in lifetime ischemic heart disease risk.' }
    ],
    drugs: [
      {
        name: 'Evolocumab (Repatha)',
        smiles: 'Fully human IgG2 monoclonal antibody targeting PCSK9',
        molecularFormula: 'Human IgG2 kappa mAb',
        molecularWeight: 144000,
        maxPhase: 4,
        indication: 'Primary hyperlipidemia and prevention of cardiovascular events',
        mechanismOfAction: 'Binds specifically to the LDLR-interaction site of PCSK9 with picomolar affinity (Kd ~16 pM), preventing LDLR degradation and reducing LDL-C by up to 60%.'
      },
      {
        name: 'Inclisiran (Leqvio)',
        smiles: 'Chemically synthesized double-stranded siRNA conjugated to triantennary N-acetylgalactosamine (GalNAc)',
        molecularFormula: 'Synthetic duplex siRNA (~17 kDa)',
        molecularWeight: 17285,
        maxPhase: 4,
        indication: 'Primary hyperlipidemia (heterozygous familial and atherosclerotic cardiovascular disease)',
        mechanismOfAction: 'GalNAc-conjugated siRNA targeted directly to hepatocytes; engages RNA-induced silencing complex (RISC) to degrade PCSK9 mRNA, providing sustained 6-month LDL-C reduction per subcutaneous injection.'
      }
    ],
    chemblActivities: []
  },
  {
    id: 'brca1',
    symbol: 'BRCA1',
    name: 'Breast Cancer Type 1 Susceptibility Protein',
    organism: 'Homo sapiens (Human)',
    uniprotId: 'P38398',
    pdbId: '1JNX',
    provenance: 'experimental',
    resolution: '2.50 Å',
    method: 'X-ray Diffraction',
    meanPlddt: 74.3,
    sequenceLength: 1863,
    description: 'Tumor suppressor involved in homologous recombination repair of DNA double-strand breaks, cell cycle checkpoint arrest, and chromatin remodeling. Heterozygous germline pathogenic mutations confer up to 70% cumulative lifetime risk of breast cancer.',
    biologicalFunction: 'N-terminal RING domain forms an obligate E3 ubiquitin ligase heterodimer with BARD1. Tandem C-terminal BRCT repeats recognize phosphorylated serine motifs (pS-X-X-F) on partner proteins (BACH1/FANCJ, CtIP, Abraxas).',
    sequence: 'MDLSALRVEEVQNVINAMQKILECPICLELIKEPVSTKCDHIFCKFCMLKLLNQKKGPSQCPLCKNDITKRSLQESTRFSQLVEELLKIICAFQLDTGLEYANSYNFAKKENNSPEHLKDEVSIIQSMGYRNRAKRLLQSEPENPSLQETSLSVQLSNLGTVRTLRTKQRIQPQKTSVYIELGSDSSEDTVNKATYCSVGDQELLQITPQGTRDEISLDSARKAELEQCVKSISAKLPTFLSTFLKSLDKETRTLIKALSKGTTGPLSSSVSDELSQQKLSSPSLNLEEDKKTKLKLEQGSSIKLSEEMSTESKTEKTLKEKLEKEEKLLTEKLENLEQGSSIKLSEEMSTESKTEKTLKEKLEKEEKLLTEKLENLEQGSSIKLSEEMSTESKTEKTLKEKLEKEEKLLTEKLENLEQGSSIKLSEEMSTESKTEKTLKEKLEKEEKLLTEKLENLEQGSSIKLSEEMSTESKTEKTLKEKLEKEEKLLTEKLENLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKLPEVEEQKKKMEKYLEKLKEEEEELKKELEKLKEEEEELKKELEKL',
    domains: [
      { id: 'RING', name: 'RING Finger Domain', start: 1, end: 100, color: '#f59e0b', database: 'Pfam', description: 'C3HC4 zinc finger heterodimerizing with BARD1 for E3 ubiquitin ligase activity' },
      { id: 'BRCT', name: 'Tandem BRCT Domains', start: 1646, end: 1859, color: '#3b82f6', database: 'Pfam', description: 'Phosphopeptide recognition module organizing DNA repair foci' }
    ],
    activeSites: [
      { position: 24, code: 'C', role: 'Zinc Finger', description: 'Zinc-coordinating cysteine in RING finger' },
      { position: 61, code: 'C', role: 'Zinc Finger', description: 'Critical zinc-coordinating cysteine; C61G is classic pathogenic founder mutation' },
      { position: 1775, code: 'M', role: 'Binding', description: 'Hydrophobic pocket residue in BRCT repeat coordinating pSer-X-X-Phe ligands' }
    ],
    variants: [
      { id: 'v1', mutation: 'C61G', position: 61, wildType: 'C', mutant: 'G', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Hereditary Breast & Ovarian Cancer Syndrome', dbSnpId: 'rs28897672', clinVarId: 'VCV000017658', consequence: 'Disrupts second zinc-binding site of RING domain, abrogating BARD1 heterodimerization and E3 ligase activity.' },
      { id: 'v2', mutation: 'M1775R', position: 1775, wildType: 'M', mutant: 'R', clinicalSignificance: 'Pathogenic', reviewStars: 4, phenotype: 'Hereditary Breast & Ovarian Cancer Syndrome', dbSnpId: 'rs121912574', clinVarId: 'VCV000017676', consequence: 'Disrupts hydrophobic core packing between BRCT repeats, preventing recognition of phosphorylated CtIP and Abraxas.' }
    ],
    drugs: [
      {
        name: 'Olaparib (Lynparza)',
        chemblId: 'CHEMBL482705',
        pubchemCid: 23725625,
        smiles: 'C1CC1C(=O)N2CCN(CC2)C(=O)C3=C(C=CC(=C3)CC4=NNC(=O)C5=CC=CC=C45)F',
        molecularFormula: 'C24H23FN4O3',
        molecularWeight: 434.5,
        maxPhase: 4,
        indication: 'BRCA-mutated advanced ovarian, breast, pancreatic, and prostate cancer',
        mechanismOfAction: 'First-in-class PARP1/2 inhibitor exploiting synthetic lethality. In BRCA-deficient tumors lacking homologous recombination, PARP trapping causes catastrophic replication fork collapse and cancer cell death.',
        xLogP: 1.9,
        tpsa: 84.7,
        hbd: 1,
        hba: 5,
        rotatableBonds: 4
      }
    ],
    chemblActivities: [
      { moleculeChemblId: 'CHEMBL482705', moleculeName: 'Olaparib', standardType: 'IC50', standardValue: 5, standardUnits: 'nM', pChemblValue: 8.30, targetChemblId: 'CHEMBL3105' }
    ]
  }
];
