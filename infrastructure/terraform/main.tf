provider "azurerm" {
  features {}
}

provider "aws" {
  region = var.aws_region
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.project_name}-${var.environment}"
  location = var.location
}

# Azure Kubernetes Service for Data Scanning and Classification Workers
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-${var.project_name}-${var.environment}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "privacy"

  default_node_pool {
    name       = "default"
    node_count = 5 # Higher count for intensive data scanning
    vm_size    = "Standard_DS3_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}

# AWS OpenSearch for High-Speed Discovery and Finding Search
resource "aws_opensearch_domain" "discovery_search" {
  domain_name    = "search-${var.project_name}-${var.environment}"
  engine_version = "OpenSearch_2.5"

  cluster_config {
    instance_type = "t3.medium.search"
    instance_count = 2
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 50 # Increased for discovery findings
  }
}

# Azure Key Vault for Secure Storage of Data Source Credentials (M365, Snowflake, etc.)
resource "azurerm_key_vault" "secrets" {
  name                        = "kv-${var.project_name}-${var.environment}"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  enabled_for_disk_encryption = true
  tenant_id                   = var.tenant_id
  sku_name                    = "premium"
}
