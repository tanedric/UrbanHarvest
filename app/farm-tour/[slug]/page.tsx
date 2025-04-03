"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronUp, ChevronLeft, ChevronRight, X, ChevronDown } from "lucide-react"
import { useFarmStore } from "@/lib/store"
import styles from "./styles.module.css"

// Farm tour images - in a real app, these would come from an API or CMS
const farmTourImages = {
  "citiponics-urban-vertical-farm": [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm1.jpg-puO12toNLZhf0FJ54E58IaBvlabYqx.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm2.jpg-9C6tvgZiDuyiSw7ZKwOxXijBIg9BIS.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm3.jpg-sgLd6K58RMq6FRduqG5bVwpkGI1wR0.jpeg",
  ],
  "com-crop": [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm1.jpg-puO12toNLZhf0FJ54E58IaBvlabYqx.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm2.jpg-9C6tvgZiDuyiSw7ZKwOxXijBIg9BIS.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm3.jpg-sgLd6K58RMq6FRduqG5bVwpkGI1wR0.jpeg",
  ],
  "community-roots": [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm1.jpg-puO12toNLZhf0FJ54E58IaBvlabYqx.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm2.jpg-9C6tvgZiDuyiSw7ZKwOxXijBIg9BIS.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farm3.jpg-sgLd6K58RMq6FRduqG5bVwpkGI1wR0.jpeg",
  ],
}

// Define hotspot coordinates for each image (relative to the original image dimensions)
// These are x,y coordinates in percentages of the original image
const imageHotspots = {
  0: [{ x: 90, y: 80, type: "up" }], // First image - up button on the walkway
  1: [
    { x: 15, y: 50, type: "left" }, // Second image - left button
    { x: 85, y: 50, type: "right" }, // Second image - right button
  ],
  2: [], // No hotspots for the last image
}

// Define close button position (relative to the original image dimensions)
const closeButtonHotspot = { x: 5, y: 5, type: "close" }

// Define information for each image - CHANGE THESE TEXTS TO CUSTOMIZE INFORMATION
const imageInfo = {
  0: {
    title: "Vertical Farming System",
    content:
      "This innovative vertical farming system uses hydroponics to grow leafy greens without soil. It receive nutrients directly through water, allowing for efficient use of space and resources. The vertical arrangement maximizes growing area while minimizing the footprint. This method uses up to 95% less water than conventional farming, making it highly sustainable and environmentally friendly.",
  },
  1: {
    title: "Lettuce Cultivation",
    content:
      "These rows of butterhead lettuce are grown in a controlled environment that optimizes light, temperature, and humidity. This system allows for continuous harvesting, with new seedlings replacing harvested plants to maintain constant production. The absence of soil also eliminates soil-borne diseases and pests, reducing the need for pesticides and creating a cleaner growing environment.",
  },
  2: {
    title: "Urban Agriculture",
    content:
      "Urban farms like this one are transforming city spaces into productive agricultural areas. By growing food closer to consumers, we reduce transportation emissions and provide fresher produce to urban communities. This rooftop installation demonstrates how unused urban spaces can be converted into productive growing areas. The farm creates a microclimate that helps reduce the urban heat island effect and improves air quality.",
  },
}

// CUSTOMIZE PANEL SETTINGS HERE
const panelSettings = {
  width: 80, // Width as percentage of image width (60 = 60%)
  horizontalPosition: 11, // Distance from left edge as percentage (15 = 15% from left)
  verticalPosition: 5, // Distance from top edge as percentage (5 = 5% from top)
  maxHeight: 25, // Maximum height as percentage of image height (25 = 25%)
  backgroundColor: "rgba(0, 128, 0, 0.7)", // Background color with opacity
  borderRadius: 8, // Border radius in pixels
  padding: 10, // Padding in pixels
}

export default function FarmTour() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const { getFarmBySlug } = useFarmStore()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [farm, setFarm] = useState<any>(null)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isInfoExpanded, setIsInfoExpanded] = useState(true)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const farmData = getFarmBySlug(slug)
    if (farmData) {
      setFarm(farmData)
    }
  }, [slug, getFarmBySlug])

  // Reset image loaded state when changing images
  useEffect(() => {
    setIsImageLoaded(false)
    setIsInfoExpanded(true) // Reset info panel to expanded state on image change
  }, [currentImageIndex])

  // Update dimensions when image loads or window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current && containerRef.current) {
        const img = imageRef.current
        const container = containerRef.current

        // Only update if image has actual dimensions
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          setImageDimensions({
            width: img.clientWidth,
            height: img.clientHeight,
          })

          setContainerDimensions({
            width: container.clientWidth,
            height: container.clientHeight,
          })

          setIsImageLoaded(true)
        }
      }
    }

    // Update on resize
    window.addEventListener("resize", updateDimensions)

    // Initial update and retry mechanism
    const attemptUpdateDimensions = () => {
      updateDimensions()

      // If dimensions are still zero, retry after a short delay
      if (imageDimensions.width === 0 && imageRef.current?.complete) {
        setTimeout(updateDimensions, 100)
      }
    }

    attemptUpdateDimensions()

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [currentImageIndex, isImageLoaded])

  const images = farmTourImages[slug as keyof typeof farmTourImages] || []

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const handleClose = () => {
    router.back()
  }

  const handleImageLoad = () => {
    // This ensures dimensions are calculated after the image is fully loaded
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.clientWidth,
        height: imageRef.current.clientHeight,
      })

      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }

      setIsImageLoaded(true)
    }
  }

  const toggleInfo = () => {
    setIsInfoExpanded(!isInfoExpanded)
  }

  // Calculate button positions based on image dimensions and hotspots
  const getButtonStyle = (hotspot: { x: number; y: number }) => {
    if (!isImageLoaded || imageDimensions.width === 0 || containerDimensions.width === 0) {
      // Return a default position until image is loaded
      return {
        position: "absolute",
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        transform: "translate(-50%, -50%)",
      }
    }

    // Calculate the actual displayed image position and size
    const imageRatio = imageDimensions.width / imageDimensions.height
    const containerRatio = containerDimensions.width / containerDimensions.height

    let displayedWidth, displayedHeight, offsetX, offsetY

    if (imageRatio > containerRatio) {
      // Image is constrained by width
      displayedWidth = containerDimensions.width
      displayedHeight = containerDimensions.width / imageRatio
      offsetX = 0
      offsetY = (containerDimensions.height - displayedHeight) / 2
    } else {
      // Image is constrained by height
      displayedHeight = containerDimensions.height
      displayedWidth = containerDimensions.height * imageRatio
      offsetX = (containerDimensions.width - displayedWidth) / 2
      offsetY = 0
    }

    // Calculate position based on hotspot coordinates
    const left = offsetX + (displayedWidth * hotspot.x) / 100
    const top = offsetY + (displayedHeight * hotspot.y) / 100

    return {
      position: "absolute",
      left: `${left}px`,
      top: `${top}px`,
      transform: "translate(-50%, -50%)",
    }
  }

  // Calculate info container position and dimensions
  const getInfoContainerStyle = () => {
    if (!isImageLoaded || imageDimensions.width === 0 || containerDimensions.width === 0) {
      return {
        position: "absolute",
        top: "10%",
        left: "10%",
        width: `${panelSettings.width}%`,
        height: isInfoExpanded ? "auto" : "40px",
        maxHeight: isInfoExpanded ? `${panelSettings.maxHeight}%` : "40px",
        overflow: "hidden",
        transition: "max-height 0.3s ease-in-out",
        backgroundColor: panelSettings.backgroundColor,
        borderRadius: `${panelSettings.borderRadius}px`,
        padding: `${panelSettings.padding}px`,
      }
    }

    // Calculate the actual displayed image position and size
    const imageRatio = imageDimensions.width / imageDimensions.height
    const containerRatio = containerDimensions.width / containerDimensions.height

    let displayedWidth, displayedHeight, offsetX, offsetY

    if (imageRatio > containerRatio) {
      // Image is constrained by width
      displayedWidth = containerDimensions.width
      displayedHeight = containerDimensions.width / imageRatio
      offsetX = 0
      offsetY = (containerDimensions.height - displayedHeight) / 2
    } else {
      // Image is constrained by height
      displayedHeight = containerDimensions.height
      displayedWidth = containerDimensions.height * imageRatio
      offsetX = (containerDimensions.width - displayedWidth) / 2
      offsetY = 0
    }

    return {
      position: "absolute",
      top: `${offsetY + (displayedHeight * panelSettings.verticalPosition) / 100}px`,
      left: `${offsetX + (displayedWidth * panelSettings.horizontalPosition) / 100}px`,
      width: `${(displayedWidth * panelSettings.width) / 100}px`,
      height: isInfoExpanded ? "auto" : "40px",
      maxHeight: isInfoExpanded ? `${(displayedHeight * panelSettings.maxHeight) / 100}px` : "40px",
      overflow: "hidden",
      transition: "max-height 0.3s ease-in-out",
      backgroundColor: panelSettings.backgroundColor,
      borderRadius: `${panelSettings.borderRadius}px`,
      padding: `${panelSettings.padding}px`,
    }
  }

  if (!farm || images.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
        <p>Loading farm tour...</p>
      </div>
    )
  }

  const currentHotspots = imageHotspots[currentImageIndex as keyof typeof imageHotspots] || []
  const currentInfo = imageInfo[currentImageIndex as keyof typeof imageInfo]

  return (
    <div className={styles.tourContainer}>
      {/* Main image */}
      <div ref={containerRef} className={styles.imageContainer}>
        <img
          ref={imageRef}
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`${farm.name} tour image ${currentImageIndex + 1}`}
          className={styles.tourImage}
          onLoad={handleImageLoad}
        />

        {/* Information Panel */}
        {currentInfo && (
          <div style={getInfoContainerStyle() as any}>
            <div className={styles.infoHeader}>
              <h3>{currentInfo.title}</h3>
              <button onClick={toggleInfo} className={styles.toggleButton}>
                {isInfoExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            {isInfoExpanded && (
              <div ref={contentRef} className={styles.infoContent}>
                {currentInfo.content}
              </div>
            )}
          </div>
        )}

        {/* Close button - positioned using hotspot */}
        <button onClick={handleClose} className={styles.navButton} style={getButtonStyle(closeButtonHotspot) as any}>
          <X className="h-6 w-6" />
        </button>

        {/* Navigation buttons - positioned based on hotspots */}
        {currentHotspots.map((hotspot, index) => {
          const buttonStyle = getButtonStyle(hotspot)
          let icon

          switch (hotspot.type) {
            case "up":
              icon = <ChevronUp className="h-8 w-8" />
              break
            case "left":
              icon = <ChevronLeft className="h-8 w-8" />
              break
            case "right":
              icon = <ChevronRight className="h-8 w-8" />
              break
            default:
              icon = <ChevronUp className="h-8 w-8" />
          }

          return (
            <button
              key={index}
              onClick={handleNextImage}
              className={`${styles.navButton} ${styles.blinkingButton}`}
              style={buttonStyle as any}
            >
              {icon}
            </button>
          )
        })}
      </div>
    </div>
  )
}

