import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sun, Trash } from "lucide-react";

export function Home() {
    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold tracking-tight">Button Style Preview</h1>
                <ModeToggle />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/** 1. Default */}
                <div>
                    <div className="text-lg font-medium mb-2">Variant: <span className="font-mono text-primary">default</span></div>
                    <div className="flex gap-3 flex-wrap items-center">
                        <Button>Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="sm">Small</Button>
                        <Button size="icon"><Sun className="size-5" /></Button>
                        <Button disabled>Disabled</Button>
                    </div>
                </div>
                {/** 2. Secondary */}
                <div>
                    <div className="text-lg font-medium mb-2">Variant: <span className="font-mono text-secondary">secondary</span></div>
                    <div className="flex gap-3 flex-wrap items-center">
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="secondary" size="lg">Large</Button>
                        <Button variant="secondary" size="sm">Small</Button>
                        <Button variant="secondary" size="icon"><Sun className="size-5" /></Button>
                        <Button variant="secondary" disabled>Disabled</Button>
                    </div>
                </div>
                {/** 3. Outline */}
                <div>
                    <div className="text-lg font-medium mb-2">Variant: <span className="font-mono text-accent">outline</span></div>
                    <div className="flex gap-3 flex-wrap items-center">
                        <Button variant="outline">Outline</Button>
                        <Button variant="outline" size="lg">Large</Button>
                        <Button variant="outline" size="sm">Small</Button>
                        <Button variant="outline" size="icon"><Sun className="size-5" /></Button>
                        <Button variant="outline" disabled>Disabled</Button>
                    </div>
                </div>
                {/** 4. Destructive */}
                <div>
                    <div className="text-lg font-medium mb-2">Variant: <span className="font-mono text-destructive">destructive</span></div>
                    <div className="flex gap-3 flex-wrap items-center">
                        <Button variant="destructive">
                            <Trash className="size-4" />Delete
                        </Button>
                        <Button variant="destructive" size="lg">Large</Button>
                        <Button variant="destructive" size="sm">Small</Button>
                        <Button variant="destructive" size="icon"><Trash className="size-5" /></Button>
                        <Button variant="destructive" disabled>Disabled</Button>
                    </div>
                </div>
                {/** 5. Ghost */}
                <div>
                    <div className="text-lg font-medium mb-2">Variant: <span className="font-mono text-gray-600">ghost</span></div>
                    <div className="flex gap-3 flex-wrap items-center">
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="ghost" size="lg">Large</Button>
                        <Button variant="ghost" size="sm">Small</Button>
                        <Button variant="ghost" size="icon"><Sun className="size-5" /></Button>
                        <Button variant="ghost" disabled>Disabled</Button>
                    </div>
                </div>
                {/** 6. Link */}
                <div>
                    <div className="text-lg font-medium mb-2">Variant: <span className="font-mono text-primary">link</span></div>
                    <div className="flex gap-3 flex-wrap items-center">
                        <Button variant="link">Link</Button>
                        <Button variant="link" size="lg">Large</Button>
                        <Button variant="link" size="sm">Small</Button>
                        <Button variant="link" disabled>Disabled</Button>
                    </div>
                </div>
            </div>
            <div className="mt-10 text-sm text-muted-foreground text-center">
                <span>Theme toggler is in the top right. Tap, hover, or focus to check all states and glassmorphism effect.</span>
            </div>
        </div>
    );
}  