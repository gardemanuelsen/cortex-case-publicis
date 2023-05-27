import { Campaign } from "@/api-client";

export function filteredCampaigns(
  campaigns: Campaign[],
  searchClientQuery: string,
  searchNameQuery: string,
  searchManagerQuery: string,
  statusDropdownValue: string
): Campaign[] {
  let filtered = campaigns;

  if (searchClientQuery) {
    const clientQuery = searchClientQuery.toLowerCase();
    filtered = filtered.filter((campaign) =>
      campaign.client.name.toLowerCase().includes(clientQuery)
    );
  }

  if (searchNameQuery) {
    const nameQuery = searchNameQuery.toLowerCase();
    filtered = filtered.filter((campaign) =>
      campaign.name.toLowerCase().includes(nameQuery)
    );
  }

  if (searchManagerQuery) {
    const managerQuery = searchManagerQuery.toLowerCase();
    filtered = filtered.filter((campaign) =>
      campaign.campaignManager.name.toLowerCase().includes(managerQuery)
    );
  }

  // Apply additional filtering based on status dropdown
  filtered = filtered.filter((campaign) => {
    const currentDate = new Date();
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    const monthsAhead = new Date();

    if (statusDropdownValue === "all") {
      return true;
    } else if (statusDropdownValue === "finished") {
      return currentDate > endDate;
    } else if (statusDropdownValue === "inProgress") {
      return currentDate >= startDate && currentDate <= endDate;
    } else if (statusDropdownValue === "3") {
      monthsAhead.setMonth(currentDate.getMonth() + 3);
      return startDate > currentDate && startDate <= monthsAhead;
    } else if (statusDropdownValue === "6") {
      monthsAhead.setMonth(currentDate.getMonth() + 6);
      return startDate > currentDate && startDate <= monthsAhead;
    } else if (statusDropdownValue === "12+") {
      monthsAhead.setMonth(currentDate.getMonth() + 12);
      return startDate >= monthsAhead;
    }

    return true; // Return true for unfiltered campaigns
  });

  return filtered;
}
