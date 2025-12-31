// Projects data with tags mapping
const projectsData = [
    {
        title: "Variational Autoencoder for MNIST and Fashion-MNIST",
        description: "Developed a Variational Autoencoder model for MNIST and Fashion-MNIST datasets. The model explores the latent space of the data and reconstructs the images from the latent space.",
        image: "images/projects/interpolation_mnist.gif",
        imageAlt: "Variational Autoencoder Image",
        link: "projects/vae.html",
        isExternal: false,
        tags: ["computer-vision", "latent-space"]
    },
    {
        title: "Unsupervied Domain Adaptation for Semantic Segmentation",
        description: "A test-time domain adaptation technique for semantic image segmentation that improves model performance on out-of-distribution data (like foggy cityscape images) by dynamically adapting batch normalization layers without additional training.",
        image: "images/projects/domain_adaptation.png",
        imageAlt: "Domain Adaptation Image",
        link: "reports/Domain_adaptation_report.pdf",
        isExternal: false,
        tags: ["computer-vision", "domain-adaptation"]
    },
    {
        title: "FCOS: Fully Convolutional One-Stage Object Detection Model",
        description: "Developed FCOS architecture that eliminates anchor boxes and provides efficient, accurate object detection. It explores object detection across multiple feature pyramid levels using ResNet backbones (ResNet18 and ResNet34), achieving a mean Average Precision (mAP) of up to 0.61 on test data.",
        image: "images/projects/fcos.png",
        imageAlt: "FCOS Image",
        link: "reports/FCOS_report.pdf",
        isExternal: false,
        tags: ["computer-vision", "object-detection"]
    },
    {
        title: "Diffusion Model for Image Synthesis",
        description: "Developed an advanced deep learning model implementing UNet architecture with diffusion techniques to generate synthetic images across MNIST and AFHQ datasets. Explored innovative techniques like sinusoidal time embeddings, cross-attention mechanisms, and latent diffusion models to reconstruct images through iterative denoising processes.",
        image: "images/projects/diffusion.png",
        imageAlt: "Diffusion Image",
        link: "reports/Diffusion_report.pdf",
        isExternal: false,
        tags: ["computer-vision", "diffusion"]
    },
    {
        title: "Creating a Realistic Donut in Blender",
        description: "In this project, I created a realistic 3D-rendered donut in Blender, focusing on procedural modeling, texturing, and lighting. It showcases my work on detailed shading, particle-based sprinkles, and high-quality rendering using Cycles.",
        image: "images/projects/Donuts.png",
        imageAlt: "Donut Image",
        link: "projects/donut.html",
        isExternal: false,
        tags: ["3d-modeling", "blender"]
    },
    {
        title: "Global Clusters: Hierarchical Analysis of Socioeconomic Indicators",
        description: "The project uses Hierarchical Agglomerative Clustering to analyze global socioeconomic data, grouping countries based on metrics like GDP, literacy rates, and life expectancy. The results were visualized through dendrograms and scatter plots, offering insights into the clustering patterns.",
        image: "images/projects/global_clusters.png",
        imageAlt: "Global Clustering Image",
        link: "https://github.com/Bhuyashi/global_clusters",
        isExternal: true,
        tags: ["data-science", "clustering"]
    },
    {
        title: "AI Teeko Game Player",
        description: "Developed an intelligent AI game player for Teeko, a strategy game played on a 5x5 board. The project involved implementing the minimax algorithm with depth-limited search, heuristic evaluation, and custom scoring functions to simulate strategic gameplay.",
        image: "images/projects/teeko.png",
        imageAlt: "Teeko Image",
        link: "projects/sample_project.html",
        isExternal: false,
        tags: ["minimax", "ml"]
    },
    {
        title: "Face Reconstruction with PCA",
        description: "Implemented Principal Component Analysis for facial image analysis to reduce dimensionality while retaining critical features. The project explored eigenfaces, variance preservation, and reconstruction to enhance understanding of feature extraction in high-dimensional datasets.",
        image: "images/projects/face_pca.png",
        imageAlt: "Faces PCA Image",
        link: "https://github.com/Bhuyashi/face_pca",
        isExternal: true,
        tags: ["computer-vision", "pca"]
    },
    {
        title: "Exploring Pathfinding Algorithms",
        description: "The project provides an interactive visualization tool that demonstrates pathfinding algorithms like A*, DFS, BFS and visually compares algorithm efficiency.",
        image: "images/projects/pathfinder.png",
        imageAlt: "Pathfinder Image",
        link: "projects/pathfinder.html",
        isExternal: false,
        tags: ["dsa", "pathfinding", "blender"]
    }
    

];

// Tag display names mapping
const tagDisplayNames = {
    "computer-vision": "Computer Vision",
    "domain-adaptation": "Domain Adaptation",
    "object-detection": "Object Detection",
    "diffusion": "Diffusion",
    "3d-modeling": "3D Modeling",
    "blender": "Blender",
    "data-science": "Data Science",
    "clustering": "Clustering",
    "minimax": "Minimax",
    "ml": "Machine Learning",
    "pca": "PCA",
    "dsa": "Data Structures & Algorithms",
    "pathfinding": "Pathfinding",
    "nlp": "NLP",
    "classification": "Classification",
    "yolo": "YOLO",
    "multi-modal": "Multi-Modal",
    "latent-space": "Latent Space"
};

