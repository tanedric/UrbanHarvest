import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface FilterSidebarProps {
  className?: string
}

export default function FilterSidebar({ className }: FilterSidebarProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="vegetables" />
            <Label htmlFor="vegetables">Vegetables</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="fruits" />
            <Label htmlFor="fruits">Fruits</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="herbs" />
            <Label htmlFor="herbs">Herbs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="microgreens" />
            <Label htmlFor="microgreens">Microgreens</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="eggs" />
            <Label htmlFor="eggs">Eggs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="honey" />
            <Label htmlFor="honey">Honey</Label>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Growing Methods</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="organic" />
            <Label htmlFor="organic">Organic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hydroponic" />
            <Label htmlFor="hydroponic">Hydroponic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="aquaponic" />
            <Label htmlFor="aquaponic">Aquaponic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vertical" />
            <Label htmlFor="vertical">Vertical Farming</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="permaculture" />
            <Label htmlFor="permaculture">Permaculture</Label>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Distance</h3>
        <div className="space-y-4">
          <Slider defaultValue={[5]} max={20} step={1} />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">0 miles</span>
            <span className="text-sm font-medium">5 miles</span>
            <span className="text-sm text-gray-500">20+ miles</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
        <div className="space-y-4">
          <Slider defaultValue={[0, 50]} max={100} step={1} />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">$0</span>
            <span className="text-sm font-medium">$0 - $50</span>
            <span className="text-sm text-gray-500">$100+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

