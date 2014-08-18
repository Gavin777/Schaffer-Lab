var sliders = new Array();
var dictionaryOfPeople = {};
var sliderConfig = {
  minSlides: 3,
  maxSlides: 3,
  auto: true,
  speed: 1000,
  slideMargin: 10,
  autoControls: true,
  slideWidth: 500,
  autoControlsCombine: true
};

var picasaConfig = {

  // General Settings
  username: 'schafferlabweb',
  mode: 'albums',
  popupPlugin: "colorbox",
  colorbox_config: {
    scalePhotos: false
  },

  // Settings for Album overview
  albumThumbSize: 160,
  showAlbumdate: false,
  sortAlbums: "ASC_DATE",

  // Setting for Photo overview
  maxResults: 999,
  thumbSize: 144,
  thumbCrop: true,

  removeAlbums: ["Schaffer"]
};

// Takes in a list of objects and returns a HTML table
var makeHTMLTable = function(listOfObjects, isAlumni) {
  var cellCreator = isAlumni ? makeHTMLAlumCell : makeHTMLCell;
  var result = "<table class=\"table\">";
  for (var i = 0; i < listOfObjects.length; i++) {
    if (i % 3 == 0) { // 3 is the number of rows
      // close and start a new row
      result += "</tr><tr>";
    }
    result += cellCreator(listOfObjects[i]);
  }
  if (listOfObjects.length % 3 == 1) {
    result += "<td></td><td></td>";
  } else if (listOfObjects.length % 3 == 2) {
    result += "<td></td>";
  }
  result+= "</tr></table>";

  return result;
};

// Takes in a person and returns a HTML cell
var makeHTMLCell = function (person) {
  var personNameList = person.Name.split(" ");
  var result = "<td width=\"33%\">";
  result += "<p class=\"center\">";
  result += "<a href=\"#" + personNameList[0] + "_" + personNameList[1] + "\">" + personNameList[1] + ", " + personNameList[0] +
             ((person.Nickname) ? (" (" + person.Nickname + ")") : "") +
             "</a>";
  result += "</p></td>";
  return result;
}

// Takes in a name and returns a HTML cell in the Alumni section
var makeHTMLAlumCell = function(alumnus) {
  var result = "<td width=\"33%\">";
  result += "<p class=\"center\">";
  if (alumnus.Link) {
    result += "<a href=\"" + alumnus.Link + "\">" + "<strong><u>" + alumnus.Name + "</u></strong>" + "</a>"
  } else {
    result += "<strong><u>" + alumnus.Name + "</u></strong>";
  }
  if (alumnus["Former Education"]) {
    result += "<br />" + alumnus["Former Education"];
  }
  if (alumnus["Current Location"]) {
    result += "<br />" + alumnus["Current Location"];
  }
  result += "</p></td>";
  return result;
}

// Takes in a person and returns a HTML snippet
var makeHTMLPage = function(person) {
  var personNameList = person.Name.split(" ");
  var result = '<div class="container webpage" id="' + personNameList[0] + "_" + personNameList[1] + '">';
  result += '<div class="page-header">';
  result += "<h1>" + personNameList[0] +
    ((person.Nickname) ? (" (" + person.Nickname + ")") : "") +
    " " + personNameList[1] + "</h1>";
  result += "</div>";
  result += "<p>";
  result += "<strong>" + person.Occupation + "</strong>";
  result += (person.Department)
            ? "<br /><strong>Department: </strong>" + person.Department
            : "";
  result += (person["Former Education"])
            ? "<br /><strong>Former Education: </strong>" + person["Former Education"]
            : "";
  result += (person["Project group"])
            ? "<br /><strong>Project Group: </strong>" + person["Project group"]
            : "";                
  result += (person["Project title"])
            ? "<br /><strong>Project Title: </strong>" + person["Project title"]
            : "";
  result += (person["Project description"])
            ? "<br /><br /><strong>Project Description: </strong><br />" + person["Project description"]
            : "";                    
  result += "</div>";
  return result;
}

var processPeoplePage = function() {
  // use this line to work locally
  var listOfPeople = {"data":[{"Name":"Andrew Bremer","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"BS University of Wisconsin-Madison, 2010","Project title":"Cell patterning on engineered substrates to investigate cellular interactions of the neural stem cell niche.","Project description":"","Project group":"","Nickname":"","Img Type":"PNG"},{"Name":"Lukasz Bugaj","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"BS, Biomedical Engineering, Johns Hopkins University. MSE, Biomedical Engineering, Johns Hopkins University","Project title":"Optogenetic tools for the precise control of cellular signaling","Project description":"Cells integrate and transmit information through cellular signaling networks, where proteins are activated and inactivated in specific sequences to yield cell fate outcomes. The complexity of these networks is compounded by their dynamic nature in both space and time. Unfortunately, current technologies are insufficient to interrogate and reproduce protein signals with the spatiotemporal resolution at which they occur in nature, thus limiting our ability to understand them. We aim to engineer novel protein systems to enable photoactivation of various signaling proteins. Successful development of such light-inducible tools will provide unprecedented fine control over protein signal duration, intensity and location within living cells and tissues. Varying these parameters and observing the corresponding biological outputs will help illuminate how signalling dynamics determine cell fate. Identifying these input-output relationships is of great interest to the field of stem cell engineering, where properly manipulating cellular environments and signals will allow the efficient generation of therapeutically relevant target cell types.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"John Chen","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"","Project title":"","Project description":"","Project group":"","Nickname":"","Img Type":""},{"Name":"Tim Day","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"BS, Biomedical Engineering, Johns Hopkins University. MSE, Biomedical Engineering, Johns Hopkins University","Project title":"Optogenetic tools for the precise control of cellular signaling","Project description":"Cells integrate and transmit information through cellular signaling networks, where proteins are activated and inactivated in specific sequences to yield cell fate outcomes. The complexity of these networks is compounded by their dynamic nature in both space and time. Unfortunately, current technologies are insufficient to interrogate and reproduce protein signals with the spatiotemporal resolution at which they occur in nature, thus limiting our ability to understand them. We aim to engineer novel protein systems to enable photoactivation of various signaling proteins. Successful development of such light-inducible tools will provide unprecedented fine control over protein signal duration, intensity and location within living cells and tissues. Varying these parameters and observing the corresponding biological outputs will help illuminate how signalling dynamics determine cell fate. Identifying these input-output relationships is of great interest to the field of stem cell engineering, where properly manipulating cellular environments and signals will allow the efficient generation of therapeutically relevant target cell types.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Barbara Ekerdt","Occupation":"Graduate Student","Department":"Chemical and Biomolecular Engineering","Former Education":"BS in Chemical Engineering at University of Texas at Austin","Project title":"Nanopatterned chemistry and topography using block copolymers and photolithography for stem cell differentiation ","Project description":"My project focuses on determining how a surface's topography can effect neural stem cell differentiation. Both length scale and organization of chemical and topographical pattern will be analyzed with self-assembling block copolymers and surfaces made from photolithography.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Benjamin Epstein","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"BS(Massachusetts Institute of Technology 2010)","Project title":"Gene therapy for dominant genetic retinal diseases","Project description":"Dominant genetic diseases provide a challenge for gene therapy approaches. I work on adeno-associated viral vector-based methods for treating such diseases in the retina.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Mike Kang","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"B.S. Chemical Engineering, B.A. English, University of Maryland College Park","Project title":"Mechanotransductive Response of Neural Progenitor Cells","Project description":"","Project group":"","Nickname":"","Img Type":""},{"Name":"Philip Kang","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"","Project title":"","Project description":"","Project group":"","Nickname":"","Img Type":""},{"Name":"Prajit Limsirichai","Occupation":"Graduate Student","Department":"Plant and microbial ","Former Education":"Trinity University, 2010","Project title":"Virus-host interactions in HIV infections","Project description":"","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Sean McFarland","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"B.S. Clarion University of Pennsylvania, Molecular / Cell Biology and Biotechnology, 2009","Project title":"Developing High Throughput (Stem) Cell Arrays for Studying Cell Properties and Behavior","Project description":"","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Riya Muckom","Occupation":"Graduate Student","Department":"Chemical and Biomolecular Engineering","Former Education":"B.S. Chemical&Biochemical Engineering, Colorado School of Mines 2013","Project title":"Developing a Platform for High Throughput Screening of Pluripotent Stem Cells","Project description":"","Project group":"","Nickname":"","Img Type":"PNG"},{"Name":"David Ojala","Occupation":"Graduate Student","Department":"Chemical and Biomolecular Engineering","Former Education":"B.S. University of Washington, (2011)","Project title":"Engineering Adeno-Associated Virus for Gene Therapy in the Central Nervous System","Project description":"Gene therapy has strong potential for treating a variety of genetic disorders of the brain and spinal cord. Improved gene delivery vehicles are needed to overcome the unique challenges of safely administering therapeutic genes in the central nervous system. My aim is to develop novel adeno-associated virus variants with unique targeting capabilities relevant to disorders of the brain and spinal cord.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Brian Perea","Occupation":"Graduate Student","Department":"Chemical and Biomolecular Engineering","Former Education":"B.S.E. in Chemical Engineering from Arizona State University, 2012","Project title":"Developing a high throughput platform for studying stem cell properties and behavior","Project description":"","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Anusuya Ramasubramanian","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"Stanford University, 2011","Project title":"Engineering Synthetic Peptide Surfaces for hESC renewal and differentiation ","Project description":"","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Nicole Repina","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"","Project title":"","Project description":"","Project group":"","Nickname":"","Img Type":""},{"Name":"Jorge Santiago-Ortiz","Occupation":"Graduate Student","Department":"Chemical and Biomolecular Engineering","Former Education":"B.S. in Chemical Engineering; University of Puerto Rico, Mayaguez","Project title":"Engineering of a lentiviral vector with directed integration properties","Project description":"Lentiviral vectors represent very important tools in both basic research and in gene therapy. Several characteristics make them desirable, such as their ability to infect both dividing and non-dividing cells and to elicit a long-term expression of the delivered gene via its integration into the host cell's genome. However, this insertion, which in lentiviruses occurs in a semi-random way, poses a risk of insertional mutagenesis, which could represent a health hazard when utilizing the lentiviruses in gene therapy. One way to circumvent this feature and to improve the vector's safety is to direct the integration events such that they are targeted to a specific site within the host cell's genome that would be safe for integration. This project aims to engineer a lentiviral vector with directed integration properties. The approach taken involves the insertion of DNA binding domains, which specifically target DNA sequences suitable for insertions, in permissible sites within the viral proteins.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Olivia Scheideler","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"BS University of Nebraska-Lincoln ","Project title":"Engineering Strategies for Dissecting the Neural Stem Cell Niche","Project description":"","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Dawn Spelke","Occupation":"Graduate Student","Department":"Bioengineering","Former Education":"MIT, BS (2009)","Project title":"Molecular mechanisms of cell-cell signaling in neural stem cells","Project description":"I am interested in studying and controlling the molecular mechanisms of cell-cell signaling in neural stem cells (NSCs). In collaboration with the Groves Lab, I am using a supported lipid bilayer system to mimic cell-cell interactions in the NSC niche, specifically Eph/ ephrin induced NSC differentiation. I am also exploring molecular and biomaterial based approaches to recapitulate cell contact dependent cues. ","Project group":"","Nickname":"","Img Type":"PNG"},{"Name":"Sabrina Sun","Occupation":"Graduate Student","Department":"Chemical & Biomolecular Engineering","Former Education":"B.S. in Chemical Engineering, Caltech, 2013","Project title":"Engineering adeno-associated viruses for gene delivery","Project description":"","Project group":"","Nickname":"","Img Type":"PNG"},{"Name":"Tandis Vazin","Occupation":"Research Scientist","Department":"","Former Education":"Ph.D. Royal Institute of Technology/Johns Hopkins Univ./NIH (2008)","Project title":"Designing biomimetic systems for directed dopaminergic differentiation of human embryonic stem cells","Project description":"Rapid progress has been attained in the development of differentiation paradigms to drive different type of neurons from human embryonic stem cells (hESCs), with the fundamental objective of using these cells for replacement and repair of damaged neuronal circuits in the central nervous system. Of particular interest are midbrain dopaminergic neurons because degeneration or loss of function of these neurons is associated with Parkinson's disease. Many protocols used to direct hESCs to develop into dopaminergic neurons are highly inefficient, or use co-culture systems of hESCs with cells of animal origin which prevents any downstream clinical application due to possible transfer of animal cells and pathogens. Also, most of these strategies employ classical two-dimensional culturing conditions for neuronal and dopaminergic induction which have limited relevance to the native three-dimensional conditions. Other major challenges that must be overcome to realize the therapeutic potential of hESC-derived dopaminergic neurons are poor survival and integration upon transplantation. To overcome these obstacles, we aim to design defined three-dimensional biological systems functionalized with bioactive components including recently identified midbrain patterning molecules and neurotrophic factors to support efficient dopaminergic differentiation of hESCs ex vivo. These cellular scaffolds are also designed to act as a temporary extracellular matrix after transplantation to enhance the survival and functional integration in vivo to meet the requirements for cell-based strategies for brain repair.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Maroof Adil","Occupation":"Postdoc","Department":"Chemical & Biomolecular Engineering","Former Education":"BS in Chemical Engineering (MIT), BS in Biology (MIT), PhD in Chemical Engineering (University of Minnesota)","Project title":"Design of materials for cell and gene delivery to the central nervous system","Project description":"","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Angela Bowman","Occupation":"Postdoc","Department":"","Former Education":"PhD, Stanford University","Project title":"Using AAV to deliver TALENs for in vivo genome editing to correct recessive inherited retinal degenerations. ","Project description":"","Project group":"","Nickname":"","Img Type":""},{"Name":"Leah Byrne","Occupation":"Postdoc","Department":"Helen Wills Neuroscience Institute","Former Education":"BA in Neuroscience from Hamilton College (2002), PhD from U.C. Berkeley HWNI (2011)","Project title":"AAV-mediated retinal gene therapy ","Project description":"Recently we have developed, using rational mutagenesis and directed evolution, novel AAV varients with enhanced abilities to transduce multiple retinal cell types. My projects focus on expanding on this work to create AAV vectors with expanded transduction profiles and using these vectors to ameliorate inherited forms of retinal degeneration.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"SiSi Chen","Occupation":"Postdoc","Department":"Bioengineering","Former Education":"BioEngineering, Ph.D UC Berkeley; Electrical Engineering, B.S. MIT","Project title":"Surface Patterning to Investigate Cell-Cell Interactions that Regulate Neural Stem Cell Fate Decisions","Project description":"Neural stem cells in the subgranular zone of the mammalian hippocampus are found in a complex cellular niche comprised of astrocytes, granule neurons, and endothelial cell-lined blood vessels. However, this niche is difficult to visualize and track in vivo. My aim is to combine high throughput imaging and surface micropatterning to recreate small-scale cellular niches to understand how neighboring cells influence NSC fate at the single-cell level.","Project group":"","Nickname":"","Img Type":"PNG"},{"Name":"Thomas Gaj","Occupation":"Postdoc","Department":"QB3","Former Education":"Ph.D. Chemistry, The Scripps Research Institute (2013)","Project title":"Directed evolution and optimization of AAV delivery systems","Project description":"","Project group":"","Nickname":"","Img Type":"GIF"},{"Name":"Mervi Kuronen","Occupation":"Postdoc","Department":"Helen Wills Neuroscience Institute","Former Education":"PhD, Folkhalsan Institute of Genetics and Neuroscience Center, University of Helsinki, Finland (2012)","Project title":"Improving AAV-mediated gene therapy for inherited retinal degenerations","Project description":"","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Yuguo Lei","Occupation":"Postdoc","Department":"QB3, Bioengineering","Former Education":"PhD, UCLA, Chemical and Biomolecular Engineering MS, UCLA, Pharmacology, Mphil, Hong Kong University of Science and Technology, Polymer Science and Engineering, BS, Peking University, Chemistry","Project title":"1) Multivalent ligands for Wnt signaling; 2) Large-scale culture system for human pluripotent stem cells","Project description":"1) Wnt proteins are potential therapeutics due to their important roles in stem cells, human development and diseases. However, producing Wnts remains challenging because of their hydrophobicity, glycosylation and lipid modifications. Based on the latest molecular biology of Wnt signaling, we are applying biomaterial engineering to create a novel class of potent, readily administered, and economical macromolecules for activating Wnt/�-catenin signaling. These molecules will provide a valuable tool for researches trying to elucidate the mechanism and function of Wnts in the development of various tissues, organs and diseases, which are currently relying on virus-mediated expression of Wnts in vivo, an approach with difficulty to controlling the concentration, duration, and activity of the Wnts. By activating key pathways that have proven difficult for small molecule agonists, these new molecules offer considerable therapeutic promise for the regeneration of various tissues such as hair, bone, CNS, hematopoietic stem cells and pancreatic B cells.<br />2) Human pluripotent stem cells may provide solutions to many human diseases. However, we must be able to produce them in large scale before they can be used in clinics. In this project, we are developing chemical- and structure-defined novel biomaterials that mimic the natural stem cell niche for culturing pluripotent stem cells in large scale.","Project group":"","Nickname":"Leo","Img Type":"PNG"},{"Name":"Sebastian Rammensee","Occupation":"Postdoc","Department":"","Former Education":"B.S., Technische University Munich (2005). Ph.D., Technische University Munich (2009)","Project title":"Towards a phase diagram of neural stem cell mechanoregulation","Project description":"Cells can respond strongly and specifically to mechanical cues in their environment, including the viscoelastic properties of the extracellular matrix. Remarkably, the lineage distributions of adult neural stem cells (NSCs) can be directed in vitro by tuning the elasticity (stiffness) of their environment. We propose to develop a phase diagram of stem cell mechanoregulation in three steps: First, we will identify the viscoelastic parameters of the extracellular matrix substrate cells sense. Second, we will determine which parts of the signal transduction machinery must be present in an NSC for it to sense its mechanical environment. To this end, we will make use of lentiviral vectors to precisely modulate expression of targets in the mechanosening pathway. This will allow us to generate a 'phase diagram' of cell response to stiffness of the material, in dependence of signal transduction machinery. Third, we will use lentiviral expression systems to address the question of whether the expression of cytoskeletal proteins characteristic for one lineage is simply correlated with differentiation, or whether it is a cause of differentiation. This is likely to have particularly high impact on the field, as the expression of these cytoskeletal proteins is frequently used as gold standard marker of cell fate. The proposed project requires expertise in materials science, mechanics, cell biophysics, and stem cell biology. We propose to use the support of the HFSP fellowship to combine my expertise in the former two areas with new training in the latter two to tackle the problem of neural stem cell mechanoregulation.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Alyssa Rosenbloom","Occupation":"Postdoc","Department":"Chemical & Biomolecular Engineering","Former Education":"BS in Genetics and BS in Biochemistry from Texas A&M University, PhD in Molecular and Cell Biology, UC Berkeley","Project title":"Development of high throughput screening systems with high content image-based analysis to elucidate new mechanisms for micro-environment regulation of stem cell fate decisions","Project description":"My project focuses on the development of multi-chromatic fluorescent sensors and reporter systems compatible with high throughput 3D cellular printing to track stem cell fate decisions in response to micro-environments.","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Jayodita Sanghvi","Occupation":"Postdoc","Department":"QB3","Former Education":"MIT, BS Biology (2007); Stanford University, PhD Bioengineering (2013)","Project title":"","Project description":"","Project group":"HIV","Nickname":"","Img Type":"JPG"},{"Name":"Delphine Blondel","Occupation":"Visiting Scholar","Department":"","Former Education":"","Project title":"","Project description":"","Project group":"","Nickname":"","Img Type":""},{"Name":"Goncaloo Rodrigues","Occupation":"Visiting Scholar","Department":"Bioengineering","Former Education":"Purification of hPSC-derived neural precursors","Project title":"Cell separation and enrichment of target-cells differentiated from human pluripotent stem cells (hPSCs) will be essential for the application of these promising cellular products in drug screening tests, disease modeling studies and tissue engineering treatments. The inability to differentiate all stem cells cultured into the desired cell type, with 100% efficiency, will demand purification stages along hPSC commitment protocols. However, the development of a wide-ranging method, or device, capable of concurrently achieve cell separations with high throughput, high target-cell recovery, high final purity and high viability remains difficult. Focusing on scalability, the central objective of this project is to develop a tag-free enrichment platform for hPSC-derived neural precursors. The successful implementation of such strategy may contribute to overcome the bottleneck of having potentially dangerous cell heterogeneity after neuronal differentiation.","Project description":"","Project group":"","Nickname":"","Img Type":"JPG"},{"Name":"Emily Connelly","Occupation":"Undergraduate","Department":"","Former Education":"","Project title":"","Project description":"","Project group":"","Nickname":"","Img Type":""},{"Name":"Yongsoo Joo","Occupation":"Undergraduate","Department":"","Former Education":"","Project title":"","Project description":"","Project group":"","Nickname":"Peter","Img Type":""},{"Name":"Shawn Sun","Occupation":"Undergraduate","Department":"","Former Education":"","Project title":"","Project description":"","Project group":"","Nickname":"","Img Type":""},{"Name":"Christina Yu","Occupation":"Undergraduate","Department":"","Former Education":"","Project title":"","Project description":"","Project group":"","Nickname":"","Img Type":""}],"errors":[],"meta":{"lines":38,"delimiter":"\t","aborted":false,"fields":["Name","Occupation","Department","Former Education","Project title","Project description","Project group","Nickname","Img Type"]}}["data"];
  //var listOfAlumni = {"data":[{"Name":"Agrawal, Smita, PhD","Former Education":"Ph.D. UC Berkeley, 2007","Current Location":"Univ. of Minnesota","Link":"","":""},{"Name":"Ashton, Prof. Randolph","Former Education":"Ph.D. Rensselaer Polytechnic Institute, 2007","Current Location":"Univ. of Wisconsin-Madison","Link":"http://www.engr.wisc.edu/bme/faculty/ashton_randolph.html","":""},{"Name":"Asuri, Prashanth, Ph.D.","Former Education":"Ph.D. Rensselaer Polytechnic Institute, 2007","Current Location":"Santa Clara University","Link":"","":""},{"Name":"Bergen, Jamie, PhD","Former Education":"Univ. of Washington, 2008","Current Location":"Stanford University","Link":"","":""},{"Name":"Burnett, John, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2008","Current Location":"City of Hope","Link":"","":""},{"Name":"Conway, Anthony, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2013","Current Location":"Sangamo Biosciences ","Link":"","":""},{"Name":"Dalkara, Deniz, Ph.D.","Former Education":"Ph.D. University of Strasbourg","Current Location":"Institut de la Vision Paris","Link":"","":""},{"Name":"Dey, Siddharth, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2012","Current Location":"Hubrecht Institute, Netherlands","Link":"","":""},{"Name":"Eshghi, Shawdee, Ph.D.","Former Education":"Ph.D. MIT, 2007","Current Location":"","Link":"","":""},{"Name":"Foley, Jonathan, PhD","Former Education":"Ph.D. UC Berkeley, 2013","Current Location":"Data Scientist | Gild, Inc.","Link":"","":""},{"Name":"Fritz, Ashley, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2012","Current Location":"","Link":"","":""},{"Name":"Gip, Phung, Ph.D.","Former Education":"Ph.D. UC berkeley, 2010","Current Location":"Stanford School of Medicine","Link":"http://postdocs.stanford.edu/profiles/postdocs/researcher/Phung_Gip","":""},{"Name":"Hwang, Bum-Yeol, PhD","Former Education":"PhD Seol National University, 2003","Current Location":"4D Molecular Therapeutics","Link":"","":""},{"Name":"Ignowski, Jolene, PhD","Former Education":"","Current Location":"","Link":"","":""},{"Name":"Jang, Prof. Jae-Hyung","Former Education":"Ph.D. Northwestern Univ,2005","Current Location":"Yonsei Univ.","Link":"http://165.132.10.17/mcel/","":""},{"Name":"Keung, Albert, PhD","Former Education":"Ph.D. UC Berkeley, 2012","Current Location":"Boston University","Link":"","":""},{"Name":"Klimczak, Ryan, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2010","Current Location":"UC Berkeley","Link":"","":""},{"Name":"Koerber, James T., Ph.D.","Former Education":"Ph.D. UC Berkeley, 2008","Current Location":"UC San Francisco","Link":"","":""},{"Name":"Kotterman, Melissa, PhD","Former Education":"Ph.D. UC Berkeley, 2013","Current Location":"4D Molecular Therapeutics","Link":"","":""},{"Name":"Kwon, Prof. Inchan","Former Education":"Ph.D.CalTech, 2006","Current Location":"Univ. of Virginia","Link":"http://www.faculty.virginia.edu/kwon/index.php","":""},{"Name":"Lai, Karen, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2003","Current Location":"Knobbe Martens Olsen & Bear","Link":"","":""},{"Name":"Lee, Gary, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2004","Current Location":"Sangamo Biosciences ","Link":"","":""},{"Name":"Leonard, Prof. Josh","Former Education":"Ph.D. UC Berkeley, 2006","Current Location":"Northwestern Univ.","Link":"http://www.chem-biol-eng.northwestern.edu/people/faculty/Leonard.html","":""},{"Name":"Lim, Prof. Kwang-il","Former Education":"Ph.D. Univ. of Wisconsin, 2005","Current Location":"Department of Medical and Pharmaceutical Sciences, Sookmyung Women's University, Seoul, South Korea","Link":"","":""},{"Name":"Little,Lauren, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2010","Current Location":"Hoffman La Roche","Link":"","":""},{"Name":"Maheshri, Prof. Narendra","Former Education":"Ph.D. UC Berkeley, 2004","Current Location":"MIT","Link":"http://web.mit.edu/~narendra/www/people.html","":""},{"Name":"Miller-Jensen, Prof. Kathryn","Former Education":"Ph.D. MIT, 2006","Current Location":"Yale Univ.","Link":"http://www.seas.yale.edu/faculty-detail.php?id=138","":""},{"Name":"Na, Yun-Suk, MS","Former Education":"MS UC Berkeley, 2014","Current Location":"","Link":"","":""},{"Name":"O'Neill, Analeah, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2005","Current Location":"O'Neill Educational Consulting","Link":"http://oneilleducationalconsulting.com/Home_Page.html","":""},{"Name":"Pangarkar, Chinmay, Ph.D.","Former Education":"Ph.D. UC Santa Barbara, 2007","Current Location":"Theranos, Inc.","Link":"","":""},{"Name":"Peltier, Joseph, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2010","Current Location":"Biomarin","Link":"","":""},{"Name":"Quock, Laura, M.S.","Former Education":"M.S. UC Berkeley, 2011","Current Location":"Abbott","Link":"","":""},{"Name":"Robertson, Matthew, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2007","Current Location":"Univ. of Minnesota","Link":"","":""},{"Name":"Saha, Krishanu, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2007","Current Location":"MIT/Whitehead Inst.","Link":"http://www.krishanusaha.com/Krishanu_Saha/Welcome.html","":""},{"Name":"Shah, Priya, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2011","Current Location":"UC San Francisco","Link":"Weinstein, John","":"UC San Francisco"},{"Name":"Stone, Daniel, Ph.D.","Former Education":"Ph.D. Univ of Manchester,2002","Current Location":"Fred Hutchinson Cancer Research Center, Seattle","Link":"","":""},{"Name":"Varedi, Marjan, Ph.D.","Former Education":"Ph.D. Univ. of Michigan-Ann Arbor, 2011","Current Location":"Advent Engineering Services","Link":"","":""},{"Name":"Weinberger, Prof. Leor","Former Education":"Ph.D. UC Berkeley, 2003","Current Location":"UCSD","Link":"http://weinbergerlab.ucsd.edu/","":""},{"Name":"Willerth, Prof. Stephanie","Former Education":"Ph.D. Washington Univ., 2008","Current Location":"Univ. of Victoria","Link":"http://www.engr.uvic.ca/~willerth/SMWLab/WebContent/people.shtml","":""},{"Name":"Yousef, Hanadie, PhD","Former Education":"PhD UC Berkeley, 2014","Current Location":"Stanford","Link":"","":""},{"Name":"Yu, Julie, Ph.D.","Former Education":"Ph.D. UC Berkeley, 2006","Current Location":"SF Exploratorium Museum","Link":"","":""},{"Name":"Yue, Prof. FengMing","Former Education":"Ph.D. Shinshu Univ, 2006","Current Location":"Shinshu Univ. Medical School","Link":"","":""}],"errors":[],"meta":{"lines":44,"delimiter":"\t","aborted":false,"fields":["Name","Former Education","Current Location","Link","",""]}}["data"];
  var listOfAlumni = Papa.parse("alumni.txt", {
    delimiter: "\t",
    download: true
  })["data"];
  var listOfPeople = Papa.parse("people.txt", {
    delimiter: "\t",
    download: true
  })["data"];  


  var listOfGradStudents = [],
      listOfScientists = [],
      listOfPostdocs = [],
      listOfScholars = [],
      listOfUndergraduates = [];

  for (var i = 0, len = listOfPeople.length, personOfInterest, personNameList; i < len; i++) {   
    personOfInterest = listOfPeople[i];
    personNameList = personOfInterest.Name.split(" ");
    dictionaryOfPeople[personNameList[0] + "_" + personNameList[1]] = personOfInterest;
    if (personOfInterest.Occupation == "Graduate Student") {
      listOfGradStudents.push(personOfInterest);
    } else if (personOfInterest.Occupation == "Research Scientist") {
      listOfScientists.push(personOfInterest);
    } else if (personOfInterest.Occupation == "Postdoc") {
      listOfPostdocs.push(personOfInterest);
    } else if (personOfInterest.Occupation == "Visiting Scholar") {
      listOfScholars.push(personOfInterest);
    } else if (personOfInterest.Occupation == "Undergraduate") {
      listOfUndergraduates.push(personOfInterest);
    }
  };

  var htmlToAdd;
  htmlToAdd = makeHTMLTable(listOfGradStudents);
  $("#gradstudents").append(htmlToAdd);

  htmlToAdd = makeHTMLTable(listOfScientists);
  $("#scientists").append(htmlToAdd);

  htmlToAdd = makeHTMLTable(listOfPostdocs);
  $("#postdocs").append(htmlToAdd);

  htmlToAdd = makeHTMLTable(listOfScholars);
  $("#scholars").append(htmlToAdd);

  htmlToAdd = makeHTMLTable(listOfUndergraduates);
  $("#undergrads").append(htmlToAdd);          

  htmlToAdd = makeHTMLTable(listOfAlumni, true);
  $("#alumni").append(htmlToAdd);


};

var loadHTMLPage = function(hashtext) {
  var person = dictionaryOfPeople[hashtext];
  $(".navbar-default").after(makeHTMLPage(person));
  var imageNameToFetch = person["Img Type"] ? hashtext + "." + person["Img Type"] : "placeholder.png";
  var img = $('<img class="regular" alt="" width="20%">').attr('src', 'img/People/' + imageNameToFetch)
    .load(function() {
      if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
        console.log("Uh oh!");
      }
      $("#" + hashtext).find(".page-header").after(img);
    });
};

var processActivePage = function(hashtext) {
  $(".webpage").hide();
  $(".nav.navbar-nav li").removeClass('active');

  hashtext = hashtext || window.location.hash.substring(1) || "home";

  if (hashtext.indexOf("_") > -1) {
    if ($("#" + hashtext).length != 0) {
      $("#" + hashtext).fadeIn();
    } else { // need to generate HTML page plus fetch image
      loadHTMLPage(hashtext);
    };
    return;
  }

  $("#" + hashtext).fadeIn();
  $("#nav" + hashtext).addClass('active');


  if (hashtext == "home" || hashtext == "interests") {
    $.each(sliders, function(i, slider) { 
        slider.reloadSlider(sliderConfig);
    });
  }
}

// var processActivePage = function(hashtext) {
//   $("#home, #bio, #interests, #ourgroup, #publications, #meetings").hide();
// };

var mainClosure = function() {
  var count = 0;
  var numOfSliders = $('.bxslider').length;
  return function() {
    count++;
    if (count == numOfSliders + 1) {
      setTimeout(processActivePage, 0);
    }
  };
};

$(document).ready(function(){

  $( "#accordion" ).accordion({ heightStyle: "content", collapsible: true });

  processPeoplePage();

  $(window).hashchange( function() {
    processActivePage();
  } );

  var conditionalProcessActivePage = mainClosure();

  picasaConfig["onAlbumsEnd"] = conditionalProcessActivePage;
  $("#albums").pwi(picasaConfig);

  // Assume that there is at least one slideshow in the entire website
  $('.bxslider').each(function(i, slider) {
    sliders[i] = $(slider).bxSlider({ onSliderLoad: conditionalProcessActivePage });
  });

  $('.group1').colorbox( {
    rel: 'group1',
    maxWidth: "900px",
    preloading: false,
    closeButton: false,    
    current: ""
  });

});
