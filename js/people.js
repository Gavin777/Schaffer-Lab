dictionaryOfPeople = {};

function Person(name, htmlDescription, imgType) {
    this.name = name;
    this.firstName = name.split(", ")[1];
    this.lastName = name.split(", ")[0];
    this.htmlDescription = htmlDescription;
    dictionaryOfPeople[this.lastName + "_" + this.firstName] = this;
    this.imgType = imgType
}

listOfGradStudents = [
    new Person(
        "Bremer, Andrew",
        "<p>Graduate Student<br> \
        Department: Bioengineering<br> \
        Former education: BS University of Wisconsin-Madison, 2010<br> \
        Project title: Cell patterning on engineered substrates to investigate cellular interactions of the neural stem cell niche.<br><br> \
        \
        Project description: \
        \
        </p>",
        "png"
    ),
    new Person(
        "Bugaj, Lukasz",
        "<p>Graduate Student<br> \
        Department: Bioengineering<br> \
        \
        Former education: BS, Biomedical Engineering, Johns Hopkins University. MSE, Biomedical Engineering, Johns Hopkins University<br> \
        Project title: Optogenetic tools for the precise control of cellular signaling<br><br> \
        \
        Project description: \
        Cells integrate and transmit information through cellular signaling networks, where proteins are activated and inactivated in specific sequences to yield cell fate outcomes.  The complexity of these networks is compounded by their dynamic nature in both space and time.  Unfortunately, current technologies are insufficient to interrogate and reproduce protein signals with the spatiotemporal resolution at which they occur in nature, thus limiting our ability to understand them.  We aim to engineer novel protein systems to enable photoactivation of various signaling proteins.  Successful development of such light-inducible tools will provide unprecedented fine control over protein signal duration, intensity and location within living cells and tissues. Varying these parameters and observing the corresponding biological outputs will help illuminate how signalling dynamics determine cell fate.  Identifying these input-output relationships is of great interest to the field of stem cell engineering, where properly manipulating cellular environments and signals will allow the efficient generation of therapeutically relevant target cell types. \
        \
        </p>",
        "jpg"
    ),
    new Person(
        "Chen, John",
        "<p>Graduate Student<br> \
                Department: Bioengineering<br> \
                Former education: <br> \
                Project title: <br><br> \
                Project description: \
        </p>"
    ),
    new Person(
        "Day, Tim",
        "<p>Graduate Student<br> \
        Department: Bioengineering<br> \
        \
        Former education: BS, Biomedical Engineering, Johns Hopkins University. MSE, Biomedical Engineering, Johns Hopkins University<br> \
        Project title: Optogenetic tools for the precise control of cellular signaling<br><br> \
        \
        Project description: \
        Cells integrate and transmit information through cellular signaling networks, where proteins are activated and inactivated in specific sequences to yield cell fate outcomes.  The complexity of these networks is compounded by their dynamic nature in both space and time.  Unfortunately, current technologies are insufficient to interrogate and reproduce protein signals with the spatiotemporal resolution at which they occur in nature, thus limiting our ability to understand them.  We aim to engineer novel protein systems to enable photoactivation of various signaling proteins.  Successful development of such light-inducible tools will provide unprecedented fine control over protein signal duration, intensity and location within living cells and tissues. Varying these parameters and observing the corresponding biological outputs will help illuminate how signalling dynamics determine cell fate.  Identifying these input-output relationships is of great interest to the field of stem cell engineering, where properly manipulating cellular environments and signals will allow the efficient generation of therapeutically relevant target cell types. \
        \
        </p>",
        "jpg"
    )
];

