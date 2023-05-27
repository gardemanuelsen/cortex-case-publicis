import { Campaign } from "@/api-client";

export function searchedCampaigns(
  campaigns: Campaign[],
  searchClientQuery: string,
  searchNameQuery: string,
  searchManagerQuery: string
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

  return filtered;
}
