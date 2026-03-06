import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Int "mo:core/Int";

actor {
  type Inquiry = {
    name : Text;
    contact : Text;
    serviceType : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Int.compare(inquiry1.timestamp, inquiry2.timestamp);
    };
  };

  var nextInqId = 0;
  let inquiries = Map.empty<Nat, Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, contact : Text, serviceType : Text, message : Text) : async () {
    if (name.size() == 0) { Runtime.trap("Name cannot be empty") };
    if (contact.size() < 5) { Runtime.trap("Contact must have at least 5 characters") };
    if (serviceType != "Tarot Card Reading" and serviceType != "Kundali Analysis") {
      Runtime.trap("Service type must be 'Tarot Card Reading' or 'Kundali Analysis'");
    };
    if (message.size() == 0) { Runtime.trap("Message cannot be empty") };

    let inquiry : Inquiry = {
      name;
      contact;
      serviceType;
      message;
      timestamp = Time.now();
    };

    inquiries.add(nextInqId, inquiry);
    nextInqId += 1;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray().sort();
  };
};
