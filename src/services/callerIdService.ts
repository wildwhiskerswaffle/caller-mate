
import { CallerInfo } from "@/components/IncomingCallScreen";

// Mock implementation of the TruecallerJS API
// In a real app, you would import and use the actual TruecallerJS library
const mockTruecallerLookup = async (phoneNumber: string): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock data based on number pattern for demonstration
  const lastDigit = parseInt(phoneNumber.slice(-1));
  
  if (lastDigit % 3 === 0) {
    return {
      name: "John Smith",
      phoneNumber,
      location: "New York, NY",
      spamLikelihood: 10,
      tags: ["Business", "Verified"]
    };
  } else if (lastDigit % 3 === 1) {
    return {
      name: "Unknown Business",
      phoneNumber,
      location: "Los Angeles, CA",
      spamLikelihood: 45,
      tags: ["Business"]
    };
  } else {
    return {
      phoneNumber,
      spamLikelihood: 85,
      location: "Unknown Location",
      tags: ["Reported Spam"]
    };
  }
};

// Simple in-memory cache
let callerCache: Record<string, { info: CallerInfo; timestamp: number }> = {};

// Cache expiration time (24 hours in milliseconds)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

export const fetchCallerInfo = async (
  phoneNumber: string,
  timeout = 5000
): Promise<CallerInfo> => {
  try {
    // Check cache first
    const cachedData = callerCache[phoneNumber];
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
      console.log("Using cached caller info for", phoneNumber);
      return { ...cachedData.info, cached: true };
    }

    // Create a promise that rejects after the timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Caller ID lookup timed out")), timeout);
    });

    // Race between the API call and the timeout
    const result = await Promise.race([
      mockTruecallerLookup(phoneNumber),
      timeoutPromise,
    ]);

    // Save to cache
    callerCache[phoneNumber] = {
      info: result,
      timestamp: Date.now(),
    };

    return result;
  } catch (error) {
    console.error("Error fetching caller info:", error);
    // Return basic info on error
    return {
      phoneNumber,
      name: "Lookup Failed",
    };
  }
};

export const clearCallerCache = () => {
  callerCache = {};
};

export const isInContacts = (phoneNumber: string): boolean => {
  // Mock implementation - in a real app, this would check the device contacts
  // For demo purposes, we'll consider numbers ending with "1234" as contacts
  return phoneNumber.endsWith("1234");
};

export const getContactInfo = (phoneNumber: string): CallerInfo => {
  // Mock implementation - in a real app, this would fetch contact details
  return {
    name: "Contact Name",
    phoneNumber,
    location: "From Contacts",
  };
};
