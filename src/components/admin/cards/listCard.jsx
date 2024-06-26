import * as React from "react"
import { Link } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "../../ui/dialog"
import { Button } from "../../ui/button"
import axios from "../../../lib/axios"
import { ScrollArea } from "../../ui/scroll-area"
import { Separator } from "../../ui/separator"



export function ListCard() {
  const [clients, setClients] = React.useState([])

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("/api/credit/clients");
        if (response.status === 200) {
          setClients(response.data);
          console.log("clients", response.data);
        } else {
          throw new Error("Failed to fetch clients");
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const getStatusColorClass = (client) => {
    const currentDate = new Date();
    const finCreditDate = new Date(client.date_fin_credit);
    const daysRemaining = Math.ceil((finCreditDate - currentDate) / (1000 * 3600 * 24));

    if (daysRemaining < 0) {
      return "bg-red-600 text-white";
    } else if (daysRemaining === 0) {
      return "bg-yellow-600 text-white";
    } else {
      return "bg-green-600 text-white";
    }
  };

  return (
    <ScrollArea className="h-72 w-100 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium leading-none py-4">Clients crédit</h4>
        <div className="flex flex-row justify-between px-3">
          <div className="text-sm font-medium">Client</div>
          <div className="text-sm font-medium">Téléphone</div>
          <div className="text-sm font-medium"> prix reste</div>
          <div className="text-sm font-medium">Jours restants</div>
          <div className="text-sm font-medium">confirmation</div>
        </div>
        <Separator className="my-2" />
        {clients.map((client) => {
          const currentDate = new Date();
          const finCreditDate = new Date(client.date_fin_credit);
          const daysRemaining = Math.ceil((finCreditDate - currentDate) / (1000 * 3600 * 24));
          return (
            <div className="">
            <div key={client.id} className='flex flex-row justify-between  px-2'>

                <div className="text-sm">{client.name} {client.lname}</div>
                <div className="text-sm">{client.phone}</div>
                <div className="text-sm">{client.remain_price}</div>
                <div className='text-sm '><span  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full w-600 ${getStatusColorClass(client)}`}> {daysRemaining} jours</span></div>
                <div>
                <Dialog>
  <DialogTrigger>Confirmer</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modifier order </DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this file from our servers?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Confirm</Button>
      <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
    </DialogFooter>
  </DialogContent>

</Dialog>

                </div>
              </div>
              <Separator className="my-2" />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
