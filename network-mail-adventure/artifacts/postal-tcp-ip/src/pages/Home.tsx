import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Package, MapPin, Truck, Send, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Station definition
type StationStep = "idle" | "writing" | "packing" | "sorting" | "loading" | "delivered";

// Content maps for postal vs technical
const content = {
  postal: {
    title: "The Internet Postal Service",
    stations: [
      {
        id: "writing",
        name: "Writing Desk",
        desc: "Where you write your letter.",
        icon: PenLine,
        colorClass: "bg-station-1",
        textClass: "text-station-1",
        borderClass: "border-station-1",
        explanation: "You write a letter and put it in an envelope to send to a friend.",
        badge: "Letter"
      },
      {
        id: "packing",
        name: "Packing Station",
        desc: "Checking envelope sizes.",
        icon: Package,
        colorClass: "bg-station-2",
        textClass: "text-station-2",
        borderClass: "border-station-2",
        explanation: "The Packing Station agrees with the recipient on envelope size before sealing letters.",
        badge: "Envelope Size: Std"
      },
      {
        id: "sorting",
        name: "Sorting Office",
        desc: "Adding addresses.",
        icon: MapPin,
        colorClass: "bg-station-3",
        textClass: "text-station-3",
        borderClass: "border-station-3",
        explanation: "The post office stamps the exact delivery addresses on the envelopes.",
        badge: "Postal Code"
      },
      {
        id: "loading",
        name: "Loading Bay",
        desc: "Putting envelopes on trucks.",
        icon: Truck,
        colorClass: "bg-station-4",
        textClass: "text-station-4",
        borderClass: "border-station-4",
        explanation: "Envelopes are loaded onto neighborhood delivery trucks to go to the next post office.",
        badge: "Delivery Truck"
      }
    ]
  },
  technical: {
    title: "TCP/IP Network Stack",
    stations: [
      {
        id: "writing",
        name: "Application Layer",
        desc: "Creating data payloads.",
        icon: PenLine,
        colorClass: "bg-station-1",
        textClass: "text-station-1",
        borderClass: "border-station-1",
        explanation: "Apps like web browsers create data payloads (like HTTP requests).",
        badge: "Data Payload"
      },
      {
        id: "packing",
        name: "Transport (TCP)",
        desc: "Segmenting & reliability.",
        icon: Package,
        colorClass: "bg-station-2",
        textClass: "text-station-2",
        borderClass: "border-station-2",
        explanation: "TCP breaks data into segments and ensures reliable delivery via a 3-way handshake.",
        badge: "MTU: 1500"
      },
      {
        id: "sorting",
        name: "Internet (IP)",
        desc: "Routing packets.",
        icon: MapPin,
        colorClass: "bg-station-3",
        textClass: "text-station-3",
        borderClass: "border-station-3",
        explanation: "IP adds source and destination IP addresses to route packets across networks.",
        badge: "IP: 192.168.1.10"
      },
      {
        id: "loading",
        name: "Link (Ethernet)",
        desc: "Framing & MAC addresses.",
        icon: Truck,
        colorClass: "bg-station-4",
        textClass: "text-station-4",
        borderClass: "border-station-4",
        explanation: "The Link layer wraps packets into frames with MAC addresses for the next physical hop.",
        badge: "Ethernet Frame"
      }
    ]
  }
};

const SmileyLetter = ({ isMoving = false, step = "idle" }: { isMoving?: boolean, step?: StationStep }) => {
  return (
    <motion.div
      className="relative w-16 h-12 bg-white rounded-md shadow-md border-2 border-gray-200 overflow-hidden flex items-center justify-center"
      animate={{
        y: isMoving ? [0, -8, 0] : [0, -2, 0],
        rotate: isMoving ? [0, -5, 5, 0] : 0,
      }}
      transition={{
        repeat: Infinity,
        duration: isMoving ? 0.5 : 2,
        ease: "easeInOut"
      }}
    >
      {/* Envelope flap lines */}
      <svg className="absolute inset-0 w-full h-full text-gray-200" viewBox="0 0 64 48">
        <path d="M0,0 L32,24 L64,0" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      
      {/* Smiley face */}
      <div className="relative z-10 flex flex-col items-center mt-3">
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        </div>
        <svg className="w-4 h-3 mt-0.5 text-gray-800" viewBox="0 0 16 12">
          <path d="M2,2 Q8,10 14,2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Badges depending on step */}
      {step === "packing" || step === "sorting" || step === "loading" ? (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 border-2 border-white"
        />
      ) : null}
      
      {step === "sorting" || step === "loading" ? (
        <motion.div 
          initial={{ scale: 0, rotate: -30 }} 
          animate={{ scale: 1, rotate: 0 }} 
          className="absolute top-1 left-1 bg-green-400 rounded-sm w-4 h-3 border border-white"
        />
      ) : null}
    </motion.div>
  );
};

export default function Home() {
  const [isTechMode, setIsTechMode] = useState(false);
  const [step, setStep] = useState<StationStep>("idle");
  const [fromName, setFromName] = useState("Alex");
  const [toName, setToName] = useState("Jamie");
  const [message, setMessage] = useState("Hello from the other side!");

  const mode = isTechMode ? "technical" : "postal";
  const activeContent = content[mode];

  const handleSend = () => {
    if (step !== "idle" && step !== "delivered") return;
    
    setStep("writing");
    setTimeout(() => setStep("packing"), 2000);
    setTimeout(() => setStep("sorting"), 4000);
    setTimeout(() => setStep("loading"), 6000);
    setTimeout(() => setStep("delivered"), 8000);
  };

  const handleReset = () => {
    setStep("idle");
  };

  const getStationIndex = (s: StationStep) => {
    switch (s) {
      case "idle": return -1;
      case "writing": return 0;
      case "packing": return 1;
      case "sorting": return 2;
      case "loading": return 3;
      case "delivered": return 4;
    }
  };

  const currentIdx = getStationIndex(step);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/20">
      
      {/* Header & Toggle */}
      <header className="w-full max-w-5xl mx-auto p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md rotate-3">
            <Package size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {activeContent.title}
          </h1>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-full shadow-sm border border-border/50">
          <Label htmlFor="mode-toggle" className={`cursor-pointer font-semibold px-2 ${!isTechMode ? 'text-primary' : 'text-muted-foreground'}`}>
            Postal
          </Label>
          <Switch 
            id="mode-toggle" 
            checked={isTechMode} 
            onCheckedChange={setIsTechMode}
            className="data-[state=checked]:bg-station-3"
          />
          <Label htmlFor="mode-toggle" className={`cursor-pointer font-semibold px-2 ${isTechMode ? 'text-station-3' : 'text-muted-foreground'}`}>
            Technical
          </Label>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 flex flex-col gap-8">
        
        {/* Composer section */}
        <Card className="border-2 shadow-lg rounded-2xl overflow-hidden bg-white">
          <div className="bg-muted p-3 border-b border-border flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1.5">
                <Label className="text-muted-foreground font-bold uppercase text-xs tracking-wider">
                  {isTechMode ? "Source IP / Client" : "From"}
                </Label>
                <Input 
                  value={fromName} 
                  onChange={e => setFromName(e.target.value)}
                  className="font-medium text-lg bg-muted/50 border-transparent focus:bg-white"
                  disabled={step !== "idle"}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-muted-foreground font-bold uppercase text-xs tracking-wider">
                  {isTechMode ? "Destination IP / Server" : "To"}
                </Label>
                <Input 
                  value={toName} 
                  onChange={e => setToName(e.target.value)}
                  className="font-medium text-lg bg-muted/50 border-transparent focus:bg-white"
                  disabled={step !== "idle"}
                />
              </div>
            </div>
            
            <div className="space-y-1.5 mb-6">
              <Label className="text-muted-foreground font-bold uppercase text-xs tracking-wider">
                {isTechMode ? "Data Payload" : "Message"}
              </Label>
              <Textarea 
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="resize-none h-24 font-medium text-lg bg-muted/50 border-transparent focus:bg-white"
                placeholder="Write your message here..."
                disabled={step !== "idle"}
              />
            </div>

            <div className="flex justify-end">
              {step === "idle" || step === "delivered" ? (
                <Button 
                  size="lg" 
                  onClick={step === "delivered" ? handleReset : handleSend}
                  className="font-bold text-lg rounded-xl shadow-md hover:-translate-y-1 transition-transform"
                >
                  {step === "delivered" ? (
                    <><RotateCcw className="mr-2" /> Send Another</>
                  ) : (
                    <><Send className="mr-2" /> {isTechMode ? "Transmit Payload" : "Send Letter!"}</>
                  )}
                </Button>
              ) : (
                <Button size="lg" disabled className="font-bold text-lg rounded-xl opacity-70">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="mr-2 inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* The Stations visualization */}
        <div className="relative mt-8 mb-16">
          
          {/* Animated Letter overlay */}
          <AnimatePresence>
            {step !== "idle" && (
              <motion.div
                className="absolute z-50 left-0 -top-8 w-full pointer-events-none flex justify-start"
                initial={{ opacity: 0, x: "5%" }}
                animate={{ 
                  opacity: step === "delivered" ? 0 : 1, 
                  x: currentIdx >= 0 ? `${(currentIdx * 25) + 12}%` : "5%",
                  scale: step === "delivered" ? 0 : 1
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <SmileyLetter isMoving={step !== "idle" && step !== "delivered"} step={step} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {activeContent.stations.map((station, idx) => {
              const Icon = station.icon;
              const isActive = currentIdx === idx;
              const isPast = currentIdx > idx;
              
              return (
                <motion.div 
                  key={station.id}
                  className={`
                    relative flex flex-col items-center text-center p-6 rounded-2xl border-4 bg-white transition-colors duration-300
                    ${isActive ? `shadow-xl scale-105 z-20 ${station.borderClass}` : 'shadow-md border-border/50 scale-100'}
                    ${isPast ? 'opacity-80' : 'opacity-100'}
                  `}
                  layout
                >
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300
                    ${isActive ? `text-white shadow-lg animate-pulse ${station.colorClass}` : 'bg-muted text-muted-foreground'}
                    ${isPast ? `text-white ${station.colorClass}` : ''}
                  `}>
                    <Icon size={32} />
                  </div>
                  
                  <h3 className="font-display font-bold text-lg mb-1">{station.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 font-medium">{station.desc}</p>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode + isActive}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mt-auto w-full"
                    >
                      <div className={`
                        text-xs font-bold px-2 py-1 rounded-full w-full mb-3
                        ${isActive ? `bg-opacity-20 ${station.textClass} bg-current` : 'bg-muted text-muted-foreground'}
                      `}>
                        {station.badge}
                      </div>
                      <p className={`text-xs leading-relaxed ${isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                        {station.explanation}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Connection arrows for desktop */}
                  {idx < activeContent.stations.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-0 translate-x-1/2 text-muted/50">
                      <ArrowRight size={32} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Status text at bottom */}
        <div className="text-center h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step !== "idle" && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl font-display font-bold text-primary bg-primary/10 px-6 py-2 rounded-full"
              >
                {step === "writing" && (isTechMode ? "Application generating payload..." : "Writing the letter at the desk...")}
                {step === "packing" && (isTechMode ? "TCP segmenting data and checking MTU..." : "Packing into standard envelopes...")}
                {step === "sorting" && (isTechMode ? "IP attaching source and destination addresses..." : "Stamping exact postal addresses on envelopes...")}
                {step === "loading" && (isTechMode ? "Ethernet framing and sending to next hop..." : "Loading envelopes onto the delivery truck...")}
                {step === "delivered" && (isTechMode ? "Transmission Complete!" : "Delivery Successful! 🎉")}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </main>
    </div>
  );
}
